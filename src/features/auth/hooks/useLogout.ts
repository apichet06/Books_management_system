// src/features/auth/hooks/useLogout.ts
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    authService.logout();
    navigate("/login"); // หรือเปลี่ยนเส้นทางตามระบบของคุณ
  };

  return logout;
};
