import React from "react";

export default function DashboardSection(props) {
  return <div className={"p-4 mx-auto w-11/12 md:w-3/4 border bg-slate-100 border-slate-500 rounded-xl shadow " + (props.className ? props.className : "")}>{props.children}</div>;
}
