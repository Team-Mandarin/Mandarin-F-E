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
    
    // 로그인 성공 시 userId, loveType 저장
    if (response.data.success) {
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      if (response.data.loveType !== undefined) {
        await AsyncStorage.setItem('loveType', String(response.data.loveType));
      }
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
   * 로그아웃 (로컬 데이터 삭제)
   */
  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove(['userId', 'isLoggedIn', 'autoLogin', 'loveType']);
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
  getUserId: async (): Promise<string | null> => {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  },

  /**
   * 로그인 상태 확인
   */
  isLoggedIn: async (): Promise<boolean> => {
    const loggedIn = await AsyncStorage.getItem('isLoggedIn');
    return loggedIn === 'true';
  },

  /**
   * 저장된 loveType 조회
   */
  getLoveType: async (): Promise<number | null> => {
    const loveType = await AsyncStorage.getItem('loveType');
    return loveType ? parseInt(loveType, 10) : null;
  },

  /**
   * loveType 저장
   */
  setLoveType: async (loveType: number): Promise<void> => {
    await AsyncStorage.setItem('loveType', String(loveType));
  },
};

