import api from '@/lib/api';
import type {
  CreateCharacterRequest,
  Character,
  SaveMessageRequest,
  ChatMessage,
  ChatMessagesResponse,
  SimulateRequest,
  SimulateResponse,
  PaginationParams,
} from '@/types/api';

export const chatService = {
  /**
   * 캐릭터 생성
   * POST /chat/characters
   */
  createCharacter: async (data: CreateCharacterRequest): Promise<Character> => {
    const response = await api.post<Character>('/chat/characters', data);
    return response.data;
  },

  /**
   * 캐릭터 목록 조회
   * GET /chat/characters
   */
  getCharacters: async (): Promise<Character[]> => {
    const response = await api.get<Character[]>('/chat/characters');
    return response.data;
  },

  /**
   * 캐릭터 상세 조회
   * GET /chat/characters/{characterId}
   */
  getCharacter: async (characterId: number): Promise<Character> => {
    const response = await api.get<Character>(`/chat/characters/${characterId}`);
    return response.data;
  },

  /**
   * 캐릭터 수정
   * PATCH /chat/characters/{characterId}
   */
  updateCharacter: async (
    characterId: number,
    data: Partial<CreateCharacterRequest>
  ): Promise<Character> => {
    const response = await api.patch<Character>(`/chat/characters/${characterId}`, data);
    return response.data;
  },

  /**
   * 캐릭터 삭제
   * DELETE /chat/characters/{characterId}
   */
  deleteCharacter: async (characterId: number): Promise<void> => {
    await api.delete(`/chat/characters/${characterId}`);
  },

  /**
   * 채팅 내역 저장
   * POST /chat/messages
   */
  saveMessage: async (data: SaveMessageRequest): Promise<ChatMessage> => {
    const response = await api.post<ChatMessage>('/chat/messages', data);
    return response.data;
  },

  /**
   * 채팅 내역 불러오기
   * GET /chat/characters/{characterId}/messages
   */
  getMessages: async (
    characterId: number,
    params?: PaginationParams
  ): Promise<ChatMessagesResponse> => {
    const response = await api.get<ChatMessagesResponse>(
      `/chat/characters/${characterId}/messages`,
      { params: { page: params?.page ?? 0, size: params?.size ?? 20 } }
    );
    return response.data;
  },

  /**
   * 채팅 시뮬레이션 (AI 응답)
   * POST /chat/simulate
   */
  simulate: async (data: SimulateRequest): Promise<SimulateResponse> => {
    const response = await api.post<SimulateResponse>('/chat/simulate', data);
    return response.data;
  },
};

