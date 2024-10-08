// src/state/authState.ts
import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    token: null,
    message: null,
  },
});
