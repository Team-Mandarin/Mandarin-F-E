import api, { SERVER_URL } from "@/lib/api";
import type {
  ApiResponse,
  CharacterReports,
  CharacterResponse,
  Characters,
  CreateReportRequest,
  CreateReportResponse,
  CreateSimulation,
  HistorySummaryRequest,
  HistorySummaryResponse,
  SendMessageRequest,
  SendMessageResponse,
  Simulation,
  SimulationHistoryResponse,
  SimulationResponse,
  Simulations,
} from "@/types/api";
import { router } from "expo-router";

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
  getChatList: async (characterId: number): Promise<Simulations> => {
    const response = await api.get<Simulations>(
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

  /**
   * 캐릭터 삭제
   * DELETE /character/delete/{character_id}
   */
  deleteCharacter: async (characterId: number): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/character/delete/${characterId}`
    );

    router.replace("/chat");
    return response.data;
  },

  /**
   * 채팅 전송
   * POST /api/chat/send
   */
  sendMessage: async (
    data: SendMessageRequest
  ): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>(`/api/chat/send`, {
      simulationId: data.simulationId,
      userMessage: data.userMessage,
    });

    return response.data;
  },

  /**
   * 시뮬레이션 단건 조회
   * GET /simulation/{simulation_id}
   */
  getSimulation: async (simulationId: number): Promise<SimulationResponse> => {
    const response = await api.get<SimulationResponse>(
      `/simulation/${simulationId}`
    );
    return response.data;
  },

  /**
   * 채팅 내역 조회
   * GET /api/chat/list
   */
  getSimulationHistory: async (
    simulationId: number
  ): Promise<SimulationHistoryResponse> => {
    const response = await api.get<SimulationHistoryResponse>(
      `/simulation/message/${simulationId}`
    );
    return response.data;
  },

  /**
   * 보고서 생성
   * POST /chat/report/create
   */
  createReport: async (
    data: CreateReportRequest
  ): Promise<CreateReportResponse> => {
    const response = await api.post<CreateReportResponse>(
      `/chat/report/create`,
      {
        simulation_id: data.simulationId,
        id: data.id,
      }
    );
    return response.data;
  },

  /**
   * 캐릭터 보고서 조회
   * GET /chat/report/character/{character_id}
   */
  getCharacterReport: async (
    characterId: number
  ): Promise<CharacterReports> => {
    const response = await api.get<CharacterReports>(
      `/character/report/${characterId}`
    );
    return response.data;
  },
};
