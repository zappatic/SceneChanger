import React from "react";
import DashboardSection from "./DashboardSection";
import { SVGClose } from "./SVGIcons";
import Title from "./Title";

export default function SectionPrivacy(props) {
  return props.show ? (
    <DashboardSection>
      <Title className="flex flex-row">
        <div className="grow">Privacy</div>
        <SVGClose
          className="h-5 cursor-pointer"
          onClick={() => {
            props.setShow(false);
          }}
        />
      </Title>
      <p className="text-sm mt-2">
        All functionality runs entirely in your browser, there is no server backend storing any information (except your IP address in the webserver log, which gets rotated out in a couple of days).
        All tokens and data are stored in your local browser storage. All connections (to OBS and Twitch) are made from within your local browser itself.
      </p>
    </DashboardSection>
  ) : null;
}
