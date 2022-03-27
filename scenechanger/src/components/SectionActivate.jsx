import React, { useContext, useState } from "react";
import Button from "./Button";
import DashboardSection from "./DashboardSection";
import simulated_redeem from "../simulated_redeem.json";
import AlertContext from "./AlertContext";

let twitchSocket = null;
let twitchPongTimeoutID = 0;
let twitchPingIntervalID = 0;

export default function SectionActivate(props) {
  const { showAlert } = useContext(AlertContext);
  const [isTwitchSocketConnected, setIsTwitchSocketConnected] = useState(false);

  const switchToScene = (sceneName) => {
    props.obs.send("SetCurrentScene", {
      "scene-name": sceneName,
    });
  };

  const processRedemption = (message) => {
    const mappingStr = localStorage.getItem("reward_scene_mapping");
    if (mappingStr !== null && message.type === "reward-redeemed") {
      const mapping = JSON.parse(mappingStr);
      const reward = message.data.redemption.reward.id;
      if (mapping.hasOwnProperty(reward)) {
        switchToScene(mapping[reward]);
        if (props.markFulfilled) {
          const accessToken = localStorage.getItem("twitch_access_token");
          const twitchChannelID = localStorage.getItem("twitch_channel_id");
          if (twitchChannelID !== null) {
            fetch(
              "https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=" +
                encodeURIComponent(twitchChannelID) +
                "&id=" +
                encodeURIComponent(message.data.redemption.id) +
                "&reward_id=" +
                encodeURIComponent(reward),
              {
                method: "PATCH",
                body: JSON.stringify({ status: "FULFILLED" }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + accessToken,
                  "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
                },
              }
            )
              .then((result) => result.json())
              .then((json) => {
                console.log("Marked as fulfilled");
              });
          }
        }
      } else {
        console.log("No scene found for reward ID", reward);
      }
    }
  };

  const testRedemption = () => {
    processRedemption(simulated_redeem);
  };

  const startListeningForRedeems = () => {
    twitchSocket = new WebSocket("wss://pubsub-edge.twitch.tv");
    twitchSocket.onopen = () => {
      setIsTwitchSocketConnected(true);
      twitchSocket.send(
        JSON.stringify({ type: "LISTEN", data: { topics: ["channel-points-channel-v1." + localStorage.getItem("twitch_channel_id")], auth_token: localStorage.getItem("twitch_access_token") } })
      );
      twitchPingIntervalID = window.setInterval(() => {
        sendTwitchPING();
      }, 60 * 1000);
    };
    twitchSocket.onclose = (e) => {
      setIsTwitchSocketConnected(false);
      console.log("Closed Twitch web socket");
    };
    twitchSocket.onerror = (e) => {
      console.log("Twitch Web socket error", e);
      twitchSocket.close();
    };
    twitchSocket.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        if (parsed.hasOwnProperty("type")) {
          if (parsed.type === "RESPONSE") {
            if (parsed.hasOwnProperty("error") && parsed.error !== "") {
              showAlert(parsed.error);
              console.log(parsed);
            }
          } else if (parsed.type === "RECONNECT") {
            reconnectToTwitch();
          } else if (parsed.type === "PONG") {
            window.clearTimeout(twitchPongTimeoutID);
          } else if (parsed.type === "MESSAGE") {
            const message = JSON.parse(parsed.data.message);
            processRedemption(message);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
  };

  const stopListeningForRedeems = () => {
    window.clearInterval(twitchPingIntervalID);
    twitchSocket.close();
  };

  const reconnectToTwitch = () => {
    stopListeningForRedeems();
    startListeningForRedeems();
  };

  const sendTwitchPING = () => {
    if (twitchSocket.readyState === 1) {
      twitchSocket.send(JSON.stringify({ type: "PING" }));
      twitchPongTimeoutID = window.setTimeout(() => {
        console.log("No PONG received for 10 seconds -> reconnecting");
        reconnectToTwitch();
      }, 10 * 1000);
    }
  };

  return (
    <DashboardSection className="flex flex-row items-center justify-center">
      {isTwitchSocketConnected ? (
        <Button
          className="bg-red-500 border-red-400"
          onClick={() => {
            stopListeningForRedeems();
          }}
        >
          Deactivate
        </Button>
      ) : (
        <Button
          className="bg-green-500 border-green-400"
          onClick={() => {
            startListeningForRedeems();
          }}
        >
          Activate
        </Button>
      )}
      {process.env.REACT_APP_SIMULATE_TWITCH === "true" ? (
        <Button
          className="ml-2"
          onClick={() => {
            testRedemption();
          }}
        >
          Simulate
        </Button>
      ) : null}
    </DashboardSection>
  );
}
