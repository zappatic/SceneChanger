import React, { Fragment, useContext, useEffect, useState } from "react";

import { TickMark, OBSIcon, Spinner, RefreshIcon, CloseIcon } from "./SVGIcons";

import DashboardSection from "./DashboardSection";
import Button from "./Button";
import Title from "./Title";
import Tooltip from "./Tooltip";
import AlertContext from "./AlertContext";

export default function SectionOBS(props) {
  const { showAlert } = useContext(AlertContext);
  const [OBSIPAddress, setOBSIPAddress] = useState("localhost");
  const [OBSPort, setOBSPort] = useState("4444");
  const [OBSPassword, setOBSPassword] = useState("");
  const [isConnectingToOBS, setIsConnectingToOBS] = useState(false);

  const [showOBSDisconnectTooltip, setShowOBSDisconnectTooltip] = useState(false);
  const [showOBSRefreshTooltip, setShowOBSRefreshTooltip] = useState(false);

  const loadScenes = () => {
    setIsConnectingToOBS(true);
    props.obs
      .connect({
        address: OBSIPAddress + ":" + OBSPort,
        password: OBSPassword,
      })
      .then(() => {
        return props.obs.send("GetSceneList");
      })
      .then((data) => {
        const scenes = [];
        data.scenes.forEach((scene) => {
          scenes.push(scene.name);
        });
        localStorage.setItem("obs_scenes", JSON.stringify(scenes));
        props.setOBSScenes(scenes);
        setIsConnectingToOBS(false);
        props.setOBSConnected(true);
      })
      .catch((err) => {
        if (err.hasOwnProperty("description")) {
          showAlert(err.description);
        } else if (err.hasOwnProperty("error")) {
          showAlert(err.error);
        }
        console.log(err);
        setIsConnectingToOBS(false);
        props.setOBSConnected(false);
      });
  };

  const disconnectOBS = () => {
    props.obs.disconnect();
    props.setOBSConnected(false);
    setShowOBSDisconnectTooltip(false);
    localStorage.removeItem("obs_ipaddress");
    localStorage.removeItem("obs_port");
    localStorage.removeItem("obs_password");
  };

  useEffect(() => {
    const ip = localStorage.getItem("obs_ipaddress");
    if (ip !== null) {
      setOBSIPAddress(ip);
    }
    const port = localStorage.getItem("obs_port");
    if (port !== null) {
      setOBSPort(port);
    }
    const pw = localStorage.getItem("obs_password");
    if (pw !== null) {
      setOBSPassword(pw);
    }
  }, []);

  return (
    <DashboardSection>
      <Title className="flex flex-row gap-2">
        <span className="grow">Step 2 - Connect to OBS</span>
        {props.obsConnected ? (
          <Fragment>
            <div className="relative">
              <RefreshIcon
                className="h-6 cursor-pointer"
                onClick={loadScenes}
                onMouseEnter={() => {
                  setShowOBSRefreshTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowOBSRefreshTooltip(false);
                }}
              />
              <Tooltip show={showOBSRefreshTooltip}>Refresh scenes</Tooltip>
            </div>
            <div className="relative">
              <CloseIcon
                className="h-6 cursor-pointer"
                onClick={disconnectOBS}
                onMouseEnter={() => {
                  setShowOBSDisconnectTooltip(true);
                }}
                onMouseLeave={() => {
                  setShowOBSDisconnectTooltip(false);
                }}
              />
              <Tooltip show={showOBSDisconnectTooltip}>Disconnect from OBS</Tooltip>
            </div>
          </Fragment>
        ) : null}
      </Title>
      {props.obsConnected ? (
        <div className="flex flex-row gap-2 items-center justify-center">
          <TickMark className="h-6 fill-green-600" />
          <div className="text-xl text-green-600 text-center">
            OBS
            <div className="text-xs">is connected</div>
            <div className="text-xs">{props.obsScenes.length} scenes found</div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="text-sm 2mb-4">
            Make sure you have the{" "}
            <a className="underline" href="https://github.com/Palakis/obs-websocket/releases/" target="_blank" rel="noreferrer">
              obs-websocket
            </a>{" "}
            plugin installed and activated in OBS Studio.
          </div>

          {OBSIPAddress !== "localhost" ? (
            <div className="text-sm my-4">
              If you are not running the browser on the same machine as OBS (so you'd have to enter an IP address instead of 'localhost'), make sure to load this site over http:// instead of https://
              because the websocket connection exposed by OBS runs unsecured, and your browser will refuse to make a connection from a https:// website to an unsecured websocket.
            </div>
          ) : null}

          <div className="flex flex-col gap-2 items-center mt-3">
            <div className="flex flex-row gap-2 items-center">
              <label className="w-24 text-right" htmlFor="obs-ip-address">
                IP address :
              </label>
              <input
                className="md:w-64 border border-slate-300 p-1 shadow rounded-lg"
                id="obs-ip-address"
                type="text"
                value={OBSIPAddress}
                onChange={(e) => {
                  setOBSIPAddress(e.currentTarget.value);
                  localStorage.setItem("obs_ipaddress", e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label className="w-24 text-right" htmlFor="obs-port">
                Port :
              </label>
              <input
                className="md:w-64 border border-slate-300 p-1 shadow rounded-lg"
                id="obs-port"
                type="text"
                value={OBSPort}
                onChange={(e) => {
                  setOBSPort(e.currentTarget.value);
                  localStorage.setItem("obs_port", e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label className="w-24 text-right" htmlFor="obs-password">
                Password :
              </label>
              <input
                className="md:w-64 border border-slate-300 p-1 shadow rounded-lg"
                id="obs-password"
                type="password"
                value={OBSPassword}
                onChange={(e) => {
                  setOBSPassword(e.currentTarget.value);
                  localStorage.setItem("obs_password", e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex flex-row gap-2 items-start">
              <label className="w-24">&nbsp;</label>
              <div className="md:w-64 flex flex-row gap-2 items-center">
                <Button
                  className="border-white flex flex-row gap-2 items-center"
                  onClick={() => {
                    loadScenes();
                  }}
                >
                  <OBSIcon className="h-5" />
                  Connect to OBS
                </Button>
                {isConnectingToOBS ? <Spinner className="h-8 animate-spin" /> : null}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </DashboardSection>
  );
}
