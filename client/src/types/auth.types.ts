import { Pet } from "../types/index";

export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    pets?: Pet[];
  };
}
