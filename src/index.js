import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Quiz from "./pages/Quiz";
import { ReduxProvider } from "./redux/provider";
import Result from "./pages/Result";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />}></Route>
          <Route exact path="/quiz" element={<Quiz />}></Route>
          <Route exact path="/result" element={<Result />}></Route>
        </Routes>
      </Router>
    </ReduxProvider>
  </React.StrictMode>
);
