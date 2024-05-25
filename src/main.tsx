import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<span>Loading...</span>}>
    <App />
  </Suspense>
);
