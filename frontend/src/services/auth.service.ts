import { apiRequest } from "./api";

export type RegisterData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email?: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export const authService = {
  register(data: RegisterData) {
    return apiRequest<AuthUser>("/auth/register", {
      method: "POST",
      body: data,
    });
  },

  login(data: LoginData) {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  // já deixo pronto pra usar na tela de perfil depois
  me() {
    return apiRequest<AuthUser>("/auth/me", { auth: true });
  },
};