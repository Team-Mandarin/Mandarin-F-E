// ============================================
// 인증 관련 타입
// ============================================

// 로그인 요청
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  nickname?: string;
}

// 회원가입 요청
export interface RegisterRequest {
  userId: string;
  username: string;
  password: string;
}

// 회원가입 응답
export interface RegisterResponse {
  userId: number;
  message: string;
}

// 자동 로그인 응답
export interface AutoLoginResponse {
  accessToken: string;
  userId: number;
  nickname?: string;
}

// ============================================
// 유저 관련 타입
// ============================================

// Love Type 설문 요청
export interface LoveTypeRequest {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

// Love Type 응답
export interface LoveTypeResponse {
  loveType: string;
  description?: string;
}

// 유저 정보
export interface User {
  id: number;
  nickname: string;
  age?: number;
  gender?: string;
  loveType?: string;
}

// ============================================
// 캐릭터/채팅 관련 타입
// ============================================

// 캐릭터 생성 요청
export interface CreateCharacterRequest {
  name: string;
  personality: string;
  description: string;
}

// 캐릭터 응답
export interface Character {
  id: number;
  name: string;
  personality: string;
  description: string;
  createdAt?: string;
}

// 채팅 메시지 저장 요청
export interface SaveMessageRequest {
  characterId: number;
  userMessage: string;
  aiMessage: string;
}

// 채팅 메시지
export interface ChatMessage {
  id: number;
  characterId: number;
  userMessage: string;
  aiMessage: string;
  createdAt: string;
}

// 채팅 내역 응답 (페이지네이션)
export interface ChatMessagesResponse {
  content: ChatMessage[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// 채팅 시뮬레이션 요청
export interface SimulateRequest {
  characterId: number;
  message: string;
}

// 채팅 시뮬레이션 응답
export interface SimulateResponse {
  aiMessage: string;
}

// ============================================
// 공통 타입
// ============================================

// API 에러 응답
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page?: number;
  size?: number;
}

