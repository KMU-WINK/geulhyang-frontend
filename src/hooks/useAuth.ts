import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, password: string) => {
    // 로그인 로직을 추가하세요
    console.log(email, password);
    setIsAuthenticated(true);
  };

  return { isAuthenticated, login };
};
