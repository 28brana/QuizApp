import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ReduxProvider } from "./redux/provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
