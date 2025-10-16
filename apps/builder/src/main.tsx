import { createRoot } from "react-dom/client";
import "./index.css";
import BuilderApp from "@/app/App";

function App() {
  return <BuilderApp />;
}

createRoot(document.getElementById("root")!).render(<App />);
