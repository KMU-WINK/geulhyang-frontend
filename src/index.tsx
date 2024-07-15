import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css"; // Tailwind CSS import
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);
