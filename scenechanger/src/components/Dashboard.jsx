import React, { Fragment, useEffect, useState } from "react";
import SectionActivate from "./SectionActivate";

import SectionHeader from "./SectionHeader";
import SectionMapping from "./SectionMapping";
import SectionOBS from "./SectionOBS";
import SectionTwitch from "./SectionTwitch";

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
      <SectionHeader />
      <SectionTwitch twitchRewards={twitchRewards} setTwitchRewards={setTwitchRewards} twitchConnected={twitchConnected} setTwitchConnected={setTwitchConnected} />
      <SectionOBS obs={obs} obsScenes={obsScenes} setOBSScenes={setOBSScenes} obsConnected={obsConnected} setOBSConnected={setOBSConnected} />
      {obsConnected && twitchConnected ? (
        <Fragment>
          <SectionMapping rewardSceneMapping={rewardSceneMapping} setRewardSceneMapping={setRewardSceneMapping} twitchRewards={twitchRewards} obsScenes={obsScenes} />
          {twitchRewards.length > 0 ? <SectionActivate obs={obs} /> : null}
        </Fragment>
      ) : null}

      <div className="text-center text-slate-600 text-xs">
        created by{" "}
        <a href="https://twitter.com/zappatic" target="_blank" rel="nofollower" className="underline">
          zappatic
        </a>{" "}
        - 2022
      </div>
    </div>
  );
}
