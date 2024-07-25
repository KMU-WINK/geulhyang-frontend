import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css"; // Tailwind CSS import
import { RecoilRoot, atom } from "recoil";
import App from "./App";

// Recoil 상태 정의
export const kakaoAuthCodeState = atom<string | null>({
  key: "kakaoAuthCodeState",
  default: null,
});

export const kakaoTokenState = atom<string | null>({
  key: "kakaoTokenState",
  default: null,
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
