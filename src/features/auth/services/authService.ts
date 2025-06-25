import axios from "@/shared/utils/axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/Authen", data);
  return response.data;
};

export const authService = {
  logout: () => {
    localStorage.removeItem("token");
    // หรือถ้าใช้ sessionStorage: sessionStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};
