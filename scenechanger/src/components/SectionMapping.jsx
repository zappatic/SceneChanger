import React from "react";
import DashboardSection from "./DashboardSection";
import Title from "./Title";

export default function SectionMapping(props) {
  const setSceneForReward = (reward, scene) => {
    let m = JSON.parse(JSON.stringify(props.rewardSceneMapping));
    m[reward] = scene;
    props.setRewardSceneMapping(m);
    localStorage.setItem("reward_scene_mapping", JSON.stringify(m));
  };

  return (
    <DashboardSection>
      <Title>Step 3 - Link rewards to scenes</Title>
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
        {props.twitchRewards.length === 0 ? (
          <div className="text-xs mt-4 text-center">No channel rewards found on Twitch...</div>
        ) : (
          <div className="mt-4">
            <input
              type="checkbox"
              value={"Y"}
              id="fulfill-rewards"
              className="mx-2"
              checked={props.markFulfilled}
              onChange={(e) => {
                localStorage.setItem("mark_reward_as_fulfilled", e.target.checked);
                props.setMarkFulfilled(e.target.checked);
              }}
            />
            <label htmlFor="fulfill-rewards" className="text-sm">
              Mark reward redeems as 'fulfilled' after changing scene (only applies to custom rewards)
            </label>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
