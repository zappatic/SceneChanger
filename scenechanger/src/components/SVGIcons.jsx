import React from "react";

export function TwitchIcon(props) {
  return (
    <svg className={props.className} onClick={props.onClick} viewBox="0 0 256 268">
      <path d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"></path>
    </svg>
  );
}

export function OBSIcon(props) {
  return (
    <svg className={props.className} onClick={props.onClick} viewBox="0 0 75 75">
      <circle cx="37.5" cy="37.5" r="35.8" fill="#302e31" stroke="#fff" strokeWidth="3.47" />
      <path
        d="m19.3 18.7c1.1-5.31 4.7-10.1 9.54-12.5-0.842 0.855-1.86 1.51-2.64 2.44-3.19 3.44-4.63 8.42-3.75 13 1.11 6.99 7.68 12.7 14.8 12.6 5.52 0.247 10.9-2.93 13.6-7.72 5.78 0.196 11.4 3.18 14.7 7.97 1.69 2.5 3.01 5.43 3.1 8.48-1.07-4.05-3.76-7.65-7.43-9.68-3.55-2-7.91-2.51-11.8-1.33-4.88 1.4-8.91 5.39-10.3 10.3-1.18 3.91-0.675 8.22 1.18 11.8-2.58 4.47-7.24 7.66-12.3 8.62-3.89 0.816-7.98 0.186-11.6-1.45 3.24 0.945 6.76 1.11 9.98-0.0353 4.32-1.43 7.89-4.9 9.46-9.18 1.74-4.66 1.08-10.2-1.85-14.2-2.19-3.15-5.64-5.37-9.39-6.16-1.19-0.212-2.39-0.308-3.59-0.418-1.91-3.85-2.61-8.32-1.65-12.5z"
        fill="#c4c2c4"
      />
    </svg>
  );
}

export function DoubleArrowRight(props) {
  return (
    <svg className={props.className} onClick={props.onClick} viewBox="0 0 24 24">
      <path d="M15.5 5H11l5 7-5 7h4.5l5-7z"></path>
      <path d="M8.5 5H4l5 7-5 7h4.5l5-7z"></path>
    </svg>
  );
}

export function TickMark(props) {
  return (
    <svg className={props.className} onClick={props.onClick} viewBox="0 0 24 24">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
    </svg>
  );
}

export function Spinner(props) {
  return (
    <svg className={props.className} onClick={props.onClick} viewBox="0 0 48 48">
      <g fill="none">
        <path
          id="track"
          fill="#C6CCD2"
          d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
        />
        <path id="section" fill="#3F4850" d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z" />
      </g>
    </svg>
  );
}

export function RefreshIcon(props) {
  return (
    <svg className={props.className} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} viewBox="0 0 24 24">
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>{" "}
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg className={props.className} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} viewBox="0 0 24 24">
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>{" "}
    </svg>
  );
}
