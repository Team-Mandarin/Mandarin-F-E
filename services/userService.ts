import api from "@/lib/api";
import type { User } from "@/types/api";

export const userService = {
  /**
   * 유저 정보 조회
   * GET /user/{user_id}
   */
  getUser: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  },

  /**
   * 유저 탈퇴
   * DELETE /user/{user_id}
   */
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/user/delete/${id}`);
  },
};
