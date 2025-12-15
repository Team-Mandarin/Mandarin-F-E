import api from "@/lib/api";
import type { ApiResponse, Characters } from "@/types/api";

export const chatService = {
  /**
   * 캐릭터 생성
   * POST /chat/characters
   */
  createCharacter: async (formData: FormData): Promise<ApiResponse<null>> => {
    // FormData를 보낼 때는 헤더가 'multipart/form-data'여야 합니다.
    // Axios가 FormData를 감지하면 자동으로 boundary를 설정해주지만, 명시적으로 설정해도 좋습니다.
    const response = await api.post<ApiResponse<null>>(
      "/character/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * 캐릭터 목록 조회
   * GET /chat/characters
   */
  getCharacters: async (id: number): Promise<Characters> => {
    const response = await api.get<Characters>(`/character/user/${id}`);
    return response.data;
  },
};
