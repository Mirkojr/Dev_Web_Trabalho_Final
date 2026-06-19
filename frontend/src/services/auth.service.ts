import { apiRequest } from "./api";
import type {
  AuthUser,
  LoginData,
  LoginResponse,
  RegisterData,
} from "@/types/auth";

export const authService = {
  register(data: RegisterData) {
    return apiRequest<AuthUser>("/auth/register", { method: "POST", body: data });
  },

  login(data: LoginData) {
    return apiRequest<LoginResponse>("/auth/login", { method: "POST", body: data });
  },

  me() {
    return apiRequest<AuthUser>("/auth/me", { auth: true });
  },
};