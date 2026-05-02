import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import "./lib/i18n";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
    <App />
  </Suspense>,
);
