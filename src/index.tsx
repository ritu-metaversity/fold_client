import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { LoadingBallSvg } from "./components/loadingBall/loadingBall";

const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// replace console.* for disable log on production
if (import.meta.env.PROD) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
root.render(
  <BrowserRouter>
    <Suspense fallback={<LoadingBallSvg />}>
      <App />
    </Suspense>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
