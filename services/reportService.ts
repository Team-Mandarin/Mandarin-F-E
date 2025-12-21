import api from "@/lib/api";
import { ChatReportAvgResponse, chatReports } from "@/types/api";
import { authService } from "./authService";

export const reportService = {
  getReportAvg: async (): Promise<ChatReportAvgResponse> => {
    const id = await authService.getId();
    const response = await api.get(`/chat/report/avg/${id}`);
    return response.data;
  },

  getChatReports: async (): Promise<chatReports> => {
    const id = await authService.getId();
    const response = await api.get(`/chat/report/user/${id}`);
    return response.data;
  },
};
