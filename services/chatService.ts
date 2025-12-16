import api, { SERVER_URL } from "@/lib/api";
import type {
  ApiResponse,
  CharacterResponse,
  Characters,
  Chats,
  CreateSimulation,
  HistorySummaryRequest,
  HistorySummaryResponse,
  Simulation,
} from "@/types/api";

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

  /**
   *  캐릭터 조회
   * GET /character/{character_id}
   */
  getCharacter: async (characterId: number): Promise<CharacterResponse> => {
    const response = await api.get<CharacterResponse>(
      `/character/${characterId}`
    );
    return response.data;
  },

  /**
   *  시뮬레이션 생성
   * POST /api/persona/analyze
   */
  createSimulation: async (data: CreateSimulation): Promise<Simulation> => {
    // [수정] 중괄호 { data }를 제거하고, 필드를 직접 나열합니다.
    const response = await api.post<Simulation>(`/api/persona/analyze`, {
      id: data.id,
      characterId: data.characterId,
      simulationName: data.simulationName,
      purpose: data.purpose,
      category: data.category,

      // ★ 중요: 백엔드 DTO는 'targetDate'를 원하므로 이름을 맞춰줍니다.
      targetDate: data.time.split("T")[0],

      // 혹시 백엔드가 bufferDays도 받는다면 추가 (없으면 생략 가능)
      // bufferDays: 7
    });
    return response.data;
  },

  /**
   * 채팅 목록 조회
   * GET /chat/list
   */
  getChatList: async (characterId: number): Promise<Chats> => {
    const response = await api.get<Chats>(
      `/simulation/character/${characterId}`
    );

    return response.data;
  },

  /**
   * 히스토리 요약
   */
  getHistorySummary: async (
    data: HistorySummaryRequest
  ): Promise<HistorySummaryResponse> => {
    const response = await api.post<HistorySummaryResponse>(
      `/api/persona/history-summary`,
      data
    );
    return response.data;
  },

  /**
   * 카카오톡 대화 마스킹
   */
  uploadAndMask: async (fileUri: string) => {
    const fileName = fileUri.split("/").pop() || "kakao_chat.txt";

    // 2. 파일 확장자로 타입 추론하기 (간단 버전)
    // 확장자가 없으면 카톡 대화내용인 'text/plain'을 기본값으로 사용
    const match = /\.(\w+)$/.exec(fileName);
    const type = match ? `text/${match[1]}` : "text/plain";

    console.log(`파일 정보 자동생성: 이름=${fileName}, 타입=${type}`);

    const formData = new FormData();

    formData.append("file", {
      uri: fileUri,
      name: fileName, // 추출한 이름
      type: type, // 추론한 타입 (이게 없으면 서버 에러남!)
    } as any);

    const response = await fetch(`${SERVER_URL}/api/persona/upload-and-mask`, {
      method: "POST",
      body: formData,
      headers: {},
    });

    return response.json(); // 마스킹된 JSON 데이터 반환
  },
};
