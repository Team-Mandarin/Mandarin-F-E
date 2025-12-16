import api from "@/lib/api";
import type {
  AutoLoginResponse,
  ChangeInfoResponse,
  CheckIdResponse,
  CheckPWResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const authService = {
  /**
   * 로그인
   * POST /auth/login
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);

    // 로그인 성공 시 id 저장
    if (response.data.success) {
      await AsyncStorage.setItem("id", String(response.data.id));
      await AsyncStorage.setItem("isLoggedIn", "true");
    }
    return response.data;
  },

  /**
   * 회원가입
   * POST /user/signup
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/user/signup", data);
    return response.data;
  },

  /**
   * 자동 로그인 (refreshToken으로 토큰 갱신)
   * GET /auth/auto-login
   */
  autoLogin: async (): Promise<AutoLoginResponse | null> => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      return null;
    }

    const response = await api.get<AutoLoginResponse>("/auth/auto-login", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    // 새 accessToken 저장
    if (response.data.accessToken) {
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
    }
    if (response.data.userId) {
      await AsyncStorage.setItem("userId", String(response.data.userId));
    }

    return response.data;
  },

  /**
   * 로그아웃 (로컬 데이터 삭제)
   */
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(["id"]);
    router.replace("/home");
  },

  /**
   * 자동 로그인 설정 저장
   */
  setAutoLoginEnabled: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.setItem("autoLogin", String(enabled));
  },

  /**
   * 자동 로그인 설정 확인
   */
  isAutoLoginEnabled: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem("autoLogin");
    return value === "true";
  },

  /**
   * 저장된 id 조회
   */
  getId: async (): Promise<string | null> => {
    const id = await AsyncStorage.getItem("id");
    return id;
  },

  /**
   * 로그인 상태 확인
   */
  isLoggedIn: async (): Promise<boolean> => {
    const loggedIn = await AsyncStorage.getItem("isLoggedIn");
    return loggedIn === "true";
  },

  /**
   * 비밀번호 인증
   */
  checkPW: async (id: string, password: string): Promise<CheckPWResponse> => {
    const response = await api.post<CheckPWResponse>("/user/checkpw", {
      id: id,
      password: password,
    });

    return response.data;
  },

  /**
   * 회원정보 수정
   */
  changeInfo: async (
    id: number,
    password?: string,
    username?: string,
    loveType?: number
  ): Promise<ChangeInfoResponse> => {
    const response = await api.post<ChangeInfoResponse>(`/user/update/${id}`, {
      password: password ? password : undefined,
      username: username ? username : undefined,
      loveType: loveType ? loveType : undefined,
    });

    return response.data;
  },

  /**
   * 아이디 중복 체크
   * GET /user/checkid
   */
  checkId: async (userId: string): Promise<CheckIdResponse> => {
    const response = await api.get<CheckIdResponse>(
      `/user/check-id?userId=${userId}`
    );
    return response.data;
  },
};
