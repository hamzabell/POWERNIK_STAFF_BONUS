import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserTokenProvider, GlobalContextProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <UserTokenProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </UserTokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
