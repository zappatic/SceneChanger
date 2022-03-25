import React, { Fragment } from "react";

export default function Tooltip(props) {
  return (
    <Fragment>
      {props.show ? (
        <div
          className={
            "absolute left-2/4 -translate-x-2/4 text-center text-xs whitespace-nowrap bg-sky-500 p-1 text-white rounded border border-slate-100 shadow " + (props.className ? props.className : null)
          }
        >
          {props.children}
        </div>
      ) : null}
    </Fragment>
  );
}
