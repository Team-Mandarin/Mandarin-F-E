import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// ⚠️ 실제 디바이스(Expo Go)에서 테스트할 때는 PC의 IP 주소를 사용하세요
const DEV_API_URL = "http://15.164.177.244:8080";

export const SERVER_URL = "http://15.164.177.244:8080";

// 환경에 따른 Base URL 설정
const getBaseUrl = () => {
  if (__DEV__) {
    return DEV_API_URL;
  }
  // 프로덕션 URL
  return "http://15.164.177.244:8080";
};

// axios 인스턴스 생성
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 660000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("토큰 조회 실패:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 👇 [핵심] 응답 인터셉터: 에러 로그 상세 출력 기능 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // -----------------------------------------------------------
    // 🔍 상세 디버깅 로그 생성 (JSON 형태로 변환하여 출력)
    // -----------------------------------------------------------
    const debugInfo = {
      message: error.message, // 에러 메시지 (예: Network Error)
      code: error.code, // 에러 코드 (예: ERR_NETWORK, ECONNABORTED)
      status: error.response?.status, // HTTP 상태 코드 (예: 404, 500)
      url: originalRequest?.url, // 요청한 주소
      baseURL: originalRequest?.baseURL, // 기본 URL
      data: error.response?.data, // 서버가 보낸 에러 응답 내용
    };

    // 401(토큰만료)이 아닐 때만 개발 환경에서만 콘솔 로그 출력
    if (error.response?.status !== 401 && __DEV__) {
      console.error("API 에러 상세 로그:", JSON.stringify(debugInfo, null, 2));
    }
    // -----------------------------------------------------------

    // 401 에러 (인증 실패) 처리 로직 (기존 유지)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.get(`${getBaseUrl()}/auth/auto-login`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          const { accessToken } = response.data;
          await AsyncStorage.setItem("accessToken", accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        await AsyncStorage.multiRemove([
          "accessToken",
          "refreshToken",
          "userId",
        ]);
        // 로그아웃 처리
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export const API_BASE_URL = getBaseUrl();
