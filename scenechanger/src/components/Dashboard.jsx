import React, { Fragment, useEffect, useState } from "react";
import SectionActivate from "./SectionActivate";

import SectionHeader from "./SectionHeader";
import SectionMapping from "./SectionMapping";
import SectionOBS from "./SectionOBS";
import SectionPrivacy from "./SectionPrivacy";
import SectionTwitch from "./SectionTwitch";

const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();

export default function Dashboard(props) {
  const [twitchRewards, setTwitchRewards] = useState([]);
  const [obsScenes, setOBSScenes] = useState([]);
  const [rewardSceneMapping, setRewardSceneMapping] = useState({});
  const [obsConnected, setOBSConnected] = useState(false);
  const [twitchConnected, setTwitchConnected] = useState(false);
  const [markFulfilled, setMarkFulfilled] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

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

    const f = localStorage.getItem("mark_reward_as_fulfilled");
    if (f !== null) {
      setMarkFulfilled(f === "true");
    }
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-6 max-w-6xl mx-auto">
      <SectionHeader />
      <SectionTwitch twitchRewards={twitchRewards} setTwitchRewards={setTwitchRewards} twitchConnected={twitchConnected} setTwitchConnected={setTwitchConnected} />
      <SectionOBS obs={obs} obsScenes={obsScenes} setOBSScenes={setOBSScenes} obsConnected={obsConnected} setOBSConnected={setOBSConnected} />
      {obsConnected && twitchConnected ? (
        <Fragment>
          <SectionMapping
            rewardSceneMapping={rewardSceneMapping}
            setRewardSceneMapping={setRewardSceneMapping}
            twitchRewards={twitchRewards}
            obsScenes={obsScenes}
            markFulfilled={markFulfilled}
            setMarkFulfilled={setMarkFulfilled}
          />
          {twitchRewards.length > 0 ? <SectionActivate obs={obs} markFulfilled={markFulfilled} /> : null}
        </Fragment>
      ) : null}
      <SectionPrivacy show={showPrivacyInfo} setShow={setShowPrivacyInfo}></SectionPrivacy>

      <div className="text-center text-slate-600 text-xs">
        created by{" "}
        <a href="https://twitter.com/zappatic" target="_blank" rel="noreferrer" className="underline">
          zappatic
        </a>{" "}
        - &copy; 2022 - view on{" "}
        <a href="https://github.com/zappatic/SceneChanger" target="_blank" rel="noreferrer" className="underline">
          github
        </a>{" "}
        - show{" "}
        <span
          onClick={() => {
            setShowPrivacyInfo(true);
          }}
          className="underline cursor-pointer"
        >
          privacy info
        </span>
      </div>
    </div>
  );
}
