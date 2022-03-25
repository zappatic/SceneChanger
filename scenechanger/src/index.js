import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { AlertProvider } from "./components/AlertContext";
import Dashboard from "./components/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <Dashboard />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
