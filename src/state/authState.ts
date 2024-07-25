// src/state/authState.ts
import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    token: null,
    firstLogin: false,
    authCode: null as string | null, // 타입을 string | null 로 설정
  },
});
