import React, { useEffect, useState } from "react";
import DashboardSection from "./DashboardSection";
import SectionMapping from "./SectionMapping";
import SectionOBS from "./SectionOBS";
import SectionTwitch from "./SectionTwitch";
import { DoubleArrowRight, OBSIcon, TwitchIcon } from "./SVGIcons";

const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();

export default function Dashboard(props) {
  const [twitchRewards, setTwitchRewards] = useState([]);
  const [obsScenes, setOBSScenes] = useState([]);
  const [rewardSceneMapping, setRewardSceneMapping] = useState({});
  const [obsConnected, setOBSConnected] = useState(false);
  const [twitchConnected, setTwitchConnected] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem("twitch_rewards");
    if (r !== null) {
      setTwitchRewards(JSON.parse(r));
    }

    const s = localStorage.getItem("obs_scenes");
    if (s !== null) {
      setOBSScenes(JSON.parse(s));
    }

    const m = localStorage.getItem("reward_scene_mapping");
    if (m !== null) {
      setRewardSceneMapping(JSON.parse(m));
    }
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-6 max-w-6xl mx-auto">
      <DashboardSection className="flex flex-col gap-4">
        <div className="text-2xl text-center">Scene Changer</div>
        <div className="flex flex-row gap-3 justify-center items-center">
          <TwitchIcon className="fill-twitch-0 h-7" />
          <DoubleArrowRight className="h-8 fill-slate-500" />
          <OBSIcon className="h-8" />
        </div>
        <div className="text-center">Switch OBS scenes through Twitch Channel Points redeems</div>
      </DashboardSection>
      <SectionTwitch twitchRewards={twitchRewards} setTwitchRewards={setTwitchRewards} twitchConnected={twitchConnected} setTwitchConnected={setTwitchConnected} />
      <SectionOBS obs={obs} obsScenes={obsScenes} setOBSScenes={setOBSScenes} obsConnected={obsConnected} setOBSConnected={setOBSConnected} />
      {obsConnected && twitchConnected ? (
        <SectionMapping rewardSceneMapping={rewardSceneMapping} setRewardSceneMapping={setRewardSceneMapping} twitchRewards={twitchRewards} obsScenes={obsScenes} />
      ) : null}
    </div>
  );
}
