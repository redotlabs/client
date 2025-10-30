import { createRoot } from "react-dom/client";
import "./index.css";
import BuilderApp from "@/app/App";
import { Toaster } from "@redotlabs/ui";

function App() {
  return (
    <>
      <BuilderApp />
      <Toaster position="bottom-right" />
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
