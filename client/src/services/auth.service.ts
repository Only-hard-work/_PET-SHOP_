import axios from "axios";
import { UserLoginData, UserRegisterData } from "../types/auth.types";

// Базовый URL для API (должен совпадать с бэкенд-роутом)
const API_URL = process.env.REACT_APP_API_URL + "/api/auth";

// Настройка экземпляра axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем интерсептор для автоматической подстановки токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AuthService = {
  async register(userData: UserRegisterData) {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Вход пользователя
   * @param credentials Данные для входа
   */
  async login(credentials: UserLoginData) {
    try {
      const response = await api.post("/login", credentials);

      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Получение данных текущего пользователя
   */
  async getMe() {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Обработка ошибок API
   * @param error Ошибка axios
   */
  handleError(error: any) {
    if (error.response) {
      // Сервер ответил с кодом ошибки
      const message = error.response.data?.message || "Request failed";
      return new Error(message);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      return new Error("No response from server");
    } else {
      // Ошибка при настройке запроса
      return new Error("Request setup error");
    }
  },
};

export default AuthService;
