import React from "react";
import { DoubleArrowRight, OBSIcon, TwitchIcon } from "./SVGIcons";
import DashboardSection from "./DashboardSection";

export default function SectionHeader(props) {
  return (
    <DashboardSection className="flex flex-col gap-4">
      <div className="text-2xl text-center">Scene Changer</div>
      <div className="flex flex-row gap-3 justify-center items-center">
        <TwitchIcon className="fill-twitch-0 h-7" />
        <DoubleArrowRight className="h-8 fill-slate-500" />
        <OBSIcon className="h-8" />
      </div>
      <div className="text-center">Switch OBS scenes through Twitch Channel Points redeems</div>
    </DashboardSection>
  );
}
