import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// ⚠️ 실제 디바이스(Expo Go)에서 테스트할 때는 PC의 IP 주소를 사용하세요
// 에뮬레이터에서 테스트할 때는 아래 주석을 참고하세요
const DEV_API_URL = 'http://15.164.177.244:8080'; // 현재 PC IP 주소

// 환경에 따른 Base URL 설정
const getBaseUrl = () => {
  if (__DEV__) {
    // 개발 환경 - 실제 디바이스(Expo Go) 또는 에뮬레이터
    // 실제 디바이스: PC의 IP 주소 사용 (현재 설정)
    return DEV_API_URL;
    
    // Android 에뮬레이터 사용 시: return 'http://10.0.2.2:8080';
    // iOS 시뮬레이터 사용 시: return 'http://localhost:8080';
  }
  // 프로덕션 URL (배포 시 변경)
  return 'https://your-production-api.com';
};

// axios 인스턴스 생성
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 추가)
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('토큰 조회 실패:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리, 토큰 갱신)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken으로 새 accessToken 요청
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.get(`${getBaseUrl()}/auth/auto-login`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          const { accessToken } = response.data;
          await AsyncStorage.setItem('accessToken', accessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId']);
        // 로그인 화면으로 이동은 AuthContext에서 처리
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// API 기본 URL 내보내기 (필요 시 사용)
export const API_BASE_URL = getBaseUrl();

