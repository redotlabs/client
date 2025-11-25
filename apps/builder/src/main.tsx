import { createRoot } from "react-dom/client";
import "./index.css";
import BuilderApp from "@/app/App";
import { RendererApp } from "@/renderer/RendererApp";

const isPreviewMode = window.location.pathname === "/preview";

function App() {
  if (isPreviewMode) {
    return <RendererApp />;
  }

  return (
    <>
      <BuilderApp />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
