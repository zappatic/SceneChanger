import React from "react";

export default function Button(props) {
  return (
    <button
      className={"px-3 py-2 bg-sky-500 inline-block rounded-xl text-white shadow-lg border border-sky-800 cursor-pointer " + (props.className ? props.className : "")}
      onClick={() => {
        if (props.hasOwnProperty("onClick")) {
          props.onClick();
        }
      }}
    >
      {props.children}
    </button>
  );
}
