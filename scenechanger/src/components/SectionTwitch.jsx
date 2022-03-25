import React, { Fragment, useState, useEffect, useCallback } from "react";

import { CloseIcon, RefreshIcon, TickMark, TwitchIcon } from "./SVGIcons";

import DashboardSection from "./DashboardSection";
import Button from "./Button";
import simulated_rewards from "../simulated_rewards.json";
import Title from "./Title";
import Tooltip from "./Tooltip";

export default function SectionTwitch(props) {
  const [twitchChannelName, setTwitchChannelName] = useState("");

  const [showTwitchDisconnectTooltip, setShowTwitchDisconnectTooltip] = useState(false);
  const [showTwitchRefreshTooltip, setShowTwitchRefreshTooltip] = useState(false);

  const updateChannelPointRewards = useCallback(
    (data) => {
      const rewards = [];
      if (data.hasOwnProperty("data")) {
        data.data.forEach((entry) => {
          rewards.push({ id: entry.id, title: entry.title });
        });
      }
      localStorage.setItem("twitch_rewards", JSON.stringify(rewards));
      props.setTwitchRewards(rewards);
    },
    [props]
  );

  const fetchChannelPointRewards = useCallback(() => {
    const accessToken = localStorage.getItem("twitch_access_token");
    const twitchChannelID = localStorage.getItem("twitch_channel_id");
    if (twitchChannelID !== null) {
      if (process.env.REACT_APP_SIMULATE_TWITCH === "true") {
        updateChannelPointRewards(simulated_rewards);
      } else {
        fetch("https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=" + encodeURIComponent(twitchChannelID), {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
          },
        })
          .then((result) => result.json())
          .then((json) => {
            updateChannelPointRewards(json);
          });
      }
    }
  }, [updateChannelPointRewards]);

  const disconnectTwitch = () => {
    props.setTwitchConnected(false);
    localStorage.removeItem("twitch_access_token");
    localStorage.removeItem("twitch_channel_id");
    localStorage.removeItem("display_name");
  };

  useEffect(() => {
    const hash = document.location.hash;
    if (hash !== "" && hash.length > 1) {
      const params = new URLSearchParams(hash.substring(1));
      if (params.has("state") && params.get("state").startsWith("twitch") && params.has("access_token")) {
        localStorage.setItem("twitch_access_token", params.get("access_token"));
        props.setTwitchConnected(true);
        window.history.pushState("", document.title, window.location.pathname);
      }
    }

    if (localStorage.getItem("twitch_access_token") !== null) {
      const accessToken = localStorage.getItem("twitch_access_token");

      // get the twitch channel details if not present
      let twitchChannelID = localStorage.getItem("twitch_channel_id");
      if (twitchChannelID === null) {
        fetch("https://api.twitch.tv/helix/users", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
          },
        })
          .then((result) => result.json())
          .then((json) => {
            if (json.hasOwnProperty("data") && Array.isArray(json.data) && json.data.length === 1) {
              const data = json.data[0];
              if (data.hasOwnProperty("id")) {
                localStorage.setItem("twitch_channel_id", data.id);
                twitchChannelID = data.id;
              } else {
                console.log("Failed to find an 'id' when requesting channel/user information", data);
              }

              if (data.hasOwnProperty("display_name")) {
                localStorage.setItem("twitch_display_name", data.display_name);
              } else {
                console.log("Failed to find a 'display_name' when requesting channel/user information", data);
              }

              fetchChannelPointRewards();
            } else {
              console.log("Failed to interpret result when fetching channel/user information", json);
            }
          });
      }

      const channelName = localStorage.getItem("twitch_display_name");
      if (channelName !== null) {
        props.setTwitchConnected(true);
        setTwitchChannelName(localStorage.getItem("twitch_display_name"));
      }
    }
  }, [fetchChannelPointRewards, props]);

  return (
    <DashboardSection>
      <Title className="flex flex-row gap-2">
        <span className="grow">Step 1 - Connect to Twitch</span>
        {props.twitchConnected ? (
          <Fragment>
            <div className="relative">
              <RefreshIcon
                className="h-6 cursor-pointer"
                onClick={fetchChannelPointRewards}
                onMouseEnter={() => {
                  setShowTwitchRefreshTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTwitchRefreshTooltip(false);
                }}
              />
              <Tooltip show={showTwitchRefreshTooltip}>Refresh rewards</Tooltip>
            </div>
            <div className="relative">
              <CloseIcon
                className="h-6 cursor-pointer"
                onClick={disconnectTwitch}
                onMouseEnter={() => {
                  setShowTwitchDisconnectTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowTwitchDisconnectTooltip(false);
                }}
              />
              <Tooltip show={showTwitchDisconnectTooltip}>Disconnect from Twitch</Tooltip>
            </div>
          </Fragment>
        ) : null}
      </Title>
      {props.twitchConnected ? (
        <div className="flex flex-row gap-2 items-center justify-center">
          <TickMark className="h-6 fill-green-600" />
          <div className="text-xl text-green-600 text-center">
            {twitchChannelName}
            <div className="text-xs">is connected</div>
            <div className="text-xs">
              {props.twitchRewards.length} reward{props.twitchRewards.length !== 1 ? "s" : null} found
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="text-sm mb-4">In order to catch the Channel Point redeem events, we'll have to connect to your Twitch channel.</div>
          <div className="flex flex-row justify-center">
            <a
              href={
                "https://id.twitch.tv/oauth2/authorize?client_id=" +
                process.env.REACT_APP_TWITCH_CLIENT_ID +
                "&redirect_uri=" +
                process.env.REACT_APP_TWITCH_REDIRECT +
                "&response_type=token&scope=channel:read:redemptions&force_verify=true&state=twitch" +
                Date.now()
              }
            >
              <Button className="bg-twitch-0 border-white flex flex-row gap-2 items-center">
                <TwitchIcon className="fill-white h-5" />
                Connect to Twitch
              </Button>
            </a>
          </div>
        </Fragment>
      )}
    </DashboardSection>
  );
}
