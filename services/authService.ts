import api from '@/lib/api';
import type {
  AutoLoginResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  /**
   * 로그인
   * POST /auth/login
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    
    // 토큰 저장
    if (response.data.accessToken) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }
    if (response.data.userId) {
      await AsyncStorage.setItem('userId', String(response.data.userId));
    }
    
    return response.data;
  },

  /**
   * 회원가입
   * POST /user/signup
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/user/signup', data);
    return response.data;
  },

  /**
   * 자동 로그인 (refreshToken으로 토큰 갱신)
   * GET /auth/auto-login
   */
  autoLogin: async (): Promise<AutoLoginResponse | null> => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return null;
    }
    
    const response = await api.get<AutoLoginResponse>('/auth/auto-login', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    
    // 새 accessToken 저장
    if (response.data.accessToken) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.userId) {
      await AsyncStorage.setItem('userId', String(response.data.userId));
    }
    
    return response.data;
  },

  /**
   * 로그아웃 (로컬 토큰 삭제)
   */
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId', 'autoLogin']);
  },

  /**
   * 자동 로그인 설정 저장
   */
  setAutoLoginEnabled: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.setItem('autoLogin', String(enabled));
  },

  /**
   * 자동 로그인 설정 확인
   */
  isAutoLoginEnabled: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem('autoLogin');
    return value === 'true';
  },

  /**
   * 저장된 userId 조회
   */
  getUserId: async (): Promise<number | null> => {
    const userId = await AsyncStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  },

  /**
   * 로그인 상태 확인
   */
  isLoggedIn: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
  },
};

