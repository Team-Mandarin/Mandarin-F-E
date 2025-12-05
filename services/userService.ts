import api from '@/lib/api';
import type {
  UpdateLoveTypeRequest,
  LoveTypeResponse,
  User,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  CheckIdResponse,
} from '@/types/api';

export const userService = {
  /**
   * 개인정보 처리 방침 조회
   * GET /privacy-policy
   */
  getPrivacyPolicy: async (): Promise<string> => {
    const response = await api.get<{ content: string }>('/privacy-policy');
    return response.data.content;
  },

  /**
   * Love Type 업데이트
   * PUT /user/lovetype
   */
  updateLoveType: async (userId: string, loveType: number): Promise<LoveTypeResponse> => {
    const request: UpdateLoveTypeRequest = { userId, loveType };
    const response = await api.put<LoveTypeResponse>('/user/lovetype', request);
    return response.data;
  },

  /**
   * 유저 정보 조회
   * GET /users/{user_id}
   */
  getUser: async (userId: number): Promise<User> => {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  },

  /**
   * 유저 정보 수정
   * PATCH /users/{user_id}
   */
  updateUser: async (userId: number, data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * 회원 탈퇴
   * DELETE /user/{userId}
   */
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/user/${userId}`);
  },

  /**
   * 비밀번호 확인
   * POST /user/verify-password
   */
  verifyPassword: async (userId: string, password: string): Promise<VerifyPasswordResponse> => {
    const request: VerifyPasswordRequest = { userId, password };
    const response = await api.post<VerifyPasswordResponse>('/user/verify-password', request);
    return response.data;
  },

  /**
   * 아이디 중복 체크
   * GET /user/check-id?userId={userId}
   */
  checkId: async (userId: string): Promise<CheckIdResponse> => {
    const response = await api.get<CheckIdResponse>(`/user/check-id?userId=${userId}`);
    return response.data;
  },
};

