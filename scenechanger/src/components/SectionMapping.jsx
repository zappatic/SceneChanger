import React, { useEffect, useState } from "react";
import DashboardSection from "./DashboardSection";
import SectionHeader from "./SectionHeader";

export default function SectionMapping(props) {
  const setSceneForReward = (reward, scene) => {
    let m = JSON.parse(JSON.stringify(props.rewardSceneMapping));
    m[reward] = scene;
    props.setRewardSceneMapping(m);
    localStorage.setItem("reward_scene_mapping", JSON.stringify(m));
  };

  return (
    <DashboardSection>
      <SectionHeader>Step 3 - Link rewards to scenes</SectionHeader>
      <div className="mt-4 flex flex-col">
        <div className="flex flex-row gap-4  py-1 px-2 border-b border-b-slate-500">
          <div className="w-6/12 italic">Reward</div>
          <div className="italic">Scene</div>
        </div>
        {props.twitchRewards.map((reward) => {
          return (
            <div key={reward.id} className="flex flex-row gap-4 odd:bg-slate-200 even:bg-slate-100 py-1 px-2">
              <div className="w-6/12 shrink-0">{reward.title}</div>
              <div>
                <select
                  className="w-full"
                  value={props.rewardSceneMapping[reward.id]}
                  onChange={(e) => {
                    setSceneForReward(reward.id, e.target.value);
                  }}
                >
                  <option value=""></option>
                  {props.obsScenes.map((scene) => {
                    return (
                      <option key={scene} value={scene}>
                        {scene}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardSection>
  );
}
