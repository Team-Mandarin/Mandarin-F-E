// ============================================
// 공통 타입
// ============================================
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ============================================
// 인증 관련 타입
// ============================================

// 로그인 요청
export interface LoginRequest {
  userId: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  success: boolean;
  message: string;
  id: number;
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

// 비밀번호 확인 요청
export interface VerifyPasswordRequest {
  userId: string;
  password: string;
}

// 비밀번호 확인 응답
export interface VerifyPasswordResponse {
  success: boolean;
  message?: string;
}

// 아이디 중복 체크 응답
export interface CheckIdResponse {
  success: boolean;
  message: string;
  data: boolean; // true: 중복, false: 사용 가능
}

export interface ChangeInfoResponse {
  success: boolean;
  message?: string;
}

// ============================================
// 유저 관련 타입
// ============================================

// Love Type 업데이트 요청
export interface UpdateLoveTypeRequest {
  userId: string;
  loveType: number; // 0-15
}

// Love Type 응답
export interface LoveTypeResponse {
  success: boolean;
  message?: string;
}

// 유저 정보
export interface User {
  success: boolean;
  message: string;
  data: {
    id: number;
    userId: string;
    username: string;
    loveType: number;
    createdAt: string;
  };
}

export interface CheckPWResponse {
  success: boolean;
  message?: string;
}

// ============================================
// 캐릭터/채팅 관련 타입
// ============================================

// 캐릭터 생성 요청
export interface CreateCharacterRequest {
  name: string;
  age: string | null;
  relationshipType: string | null;
  dateMet: Date | null;
  loveTypeAnswers: { [key: number]: number | null };
  history: string;
}

export interface Characters {
  code: number;
  message?: string;
  data: Character[];
}

// 캐릭터 응답
export interface Character {
  id: number;
  characterId: number;
  characterName: string;
  personality: string;
  description: string;
  createdAt?: string;
  imageUrl?: string;
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
