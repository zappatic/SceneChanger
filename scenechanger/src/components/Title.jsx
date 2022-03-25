import React from "react";

export default function Title(props) {
  return <div className={"relative " + (props.className ? props.className : "")}>{props.children}</div>;
}
