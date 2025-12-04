import api from '@/lib/api';
import type {
  LoveTypeRequest,
  LoveTypeResponse,
  User,
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
   * Love Type 설문 결과 저장
   * POST /users/{user_id}/love-type
   */
  submitLoveType: async (userId: number, data: LoveTypeRequest): Promise<LoveTypeResponse> => {
    const response = await api.post<LoveTypeResponse>(`/users/${userId}/love-type`, data);
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
  deleteUser: async (userId: number): Promise<void> => {
    await api.delete(`/user/${userId}`);
  },
};

