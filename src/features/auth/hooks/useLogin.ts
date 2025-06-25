import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const useLogin = (onSuccess: (data: LoginResponse) => void) => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess,
  });
};
