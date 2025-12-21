import { reportService } from "@/services/reportService";
import { chatReport, ReportAvg } from "@/types/api";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import Juice from "./juice";
import LineChart from "./LineChart";
import Score from "./score";

export default function Me() {
  const [chatReportAvg, setChatReportAvg] = useState<ReportAvg[]>([]);
  const [chatReports, setChatReports] = useState<chatReport[]>([]);

  useEffect(() => {
    const getReportAvg = async () => {
      const response = await reportService.getReportAvg();
      setChatReportAvg(response.data ?? []);

      const chatReportsResponse = await reportService.getChatReports();
      setChatReports(chatReportsResponse.data ?? []);
    };
    getReportAvg();
  }, []);

  const getScoreByLabelKey = (labelKey: ReportAvg["totalLabelKey"]): number => {
    const item = chatReportAvg.find((item) => item.totalLabelKey === labelKey);
    return item?.totalLabelScore ?? 0;
  };

  // 같은 createdAt을 가진 항목들을 하나로 합치고, 시간 순서대로 정렬
  const getSortedReports = (): chatReport[] => {
    // createdAt을 키로 하는 Map을 사용하여 중복 제거
    const uniqueReports = new Map<string, chatReport>();

    chatReports.forEach((report) => {
      const createdAt = report.createdAt;
      // 같은 createdAt이 없거나, 있더라도 첫 번째 항목만 유지
      if (!uniqueReports.has(createdAt)) {
        uniqueReports.set(createdAt, report);
      }
    });

    // Map의 값들을 배열로 변환하고 createdAt 기준으로 정렬
    return Array.from(uniqueReports.values()).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  };

  const sortedReports = getSortedReports();
  const scoreData = sortedReports.map((report) => report.scoreAvg);
  const scoreLabels = sortedReports.map(
    (report) => report.createdAt.slice(5, 10) // "12-21" 형식으로 날짜만 추출
  );

  return (
    <ScrollView
      className="flex-1 bg-[#f6f5f3] my-6"
      contentContainerStyle={{ alignItems: "center", gap: 16 }}
    >
      <Juice score={chatReportAvg[0]?.avgMandarinScore ?? 0} />
      <View className="bg-white w-96 rounded-2xl p-6">
        <MandarinText className="text-2xl font-semibold">
          나의 최근 대화 점수
        </MandarinText>
        <MandarinText className="text-xl font-medium mt-8">
          관계 빌드업 점수
        </MandarinText>
        <Score label="나의 최근 대화 점수" score={getScoreByLabelKey("F1")} />
        <Score label="관계 유지력" score={getScoreByLabelKey("F2")} />
        <Score label="선택 일관성" score={getScoreByLabelKey("F3")} />
        <MandarinText className="text-xl font-medium mt-8">
          후회 회복력 점수
        </MandarinText>
        <Score label="후회 해소도" score={getScoreByLabelKey("P1")} />
        <Score label="표현 성숙도" score={getScoreByLabelKey("P2")} />
        <Score label="관계 회복력" score={getScoreByLabelKey("P3")} />
      </View>
      <View className="bg-white w-96 rounded-2xl p-6">
        <MandarinText className="text-2xl font-semibold">
          나의 성장
        </MandarinText>
        <MandarinText className="text-xs font-medium text-[#8E8E8E] mb-4">
          나의 채팅 점수 기록을 통해 얼만큼 성장했는지 알 수 있어요.
        </MandarinText>
        <LineChart
          data={scoreData}
          labels={scoreLabels}
          className="w-80 h-48 mx-auto"
        />
      </View>
    </ScrollView>
  );
}
