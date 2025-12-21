import ScoreBarChart from "@/components/report/ScoreBarChart";
import ScoreCircle from "@/components/report/ScoreCircle";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatReport() {
  const { report } = useLocalSearchParams<{ report: string }>();
  const parsedReportResponse = report ? JSON.parse(report) : null;

  const scenarioType = parsedReportResponse?.report?.scenario_type;

  const labels =
    scenarioType === "PAST"
      ? ["후회 해소도", "표현 성숙도", "관계 회복력"]
      : ["관계 유지력", "감정 안정성", "선택 일관성"];

  const scores = parsedReportResponse?.report?.scores;

  // Metric 배열로 변환하고 타입 안전하게 처리
  const metrics = scores
    ? [scores.metric_1, scores.metric_2, scores.metric_3].filter(Boolean)
    : [];

  const message =
    parsedReportResponse?.report.scores.metric_1.key_conversations;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView>
        <MandarinText className="text-2xl font-medium ml-8 mt-4">
          {scenarioType === "PAST"
            ? "후회 회복력 점수 🖤"
            : "표현 성숙도 점수 🩷"}
        </MandarinText>
        <View className="items-center mt-12">
          <ScoreCircle
            score={Number(parsedReportResponse.report.report.overall_rating)}
          />
        </View>
        <View className="w-full border-b border-gray-300 my-4" />
        <View className="mt-12">
          <ScoreBarChart
            label_key={metrics.map((metric) => metric.score)}
            label_score={metrics.map((metric) => metric.score)}
            labels={labels}
          />
        </View>
        <View className="w-full border-b border-gray-300" />
        <MandarinText className="text-4xl font-bold text-left ml-12 mt-4">
          "
        </MandarinText>
        <View className="px-4 py-2">
          {message.map((item: any, index: number) =>
            item.role === "assistant" ? (
              // AI 메시지 - 왼쪽 정렬, 프로필 이미지 포함
              <View key={index} className="flex-row items-start mb-3">
                <View className="bg-[#F3F5F7] px-4 py-3 max-w-[70%] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
                  <MandarinText className="text-black">
                    {item.content}
                  </MandarinText>
                </View>
              </View>
            ) : (
              // User 메시지 - 오른쪽 정렬
              <View key={index} className="flex-row justify-end mb-3">
                <View className="bg-[#FF9D00] px-4 py-3 max-w-[70%] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl">
                  <MandarinText className="text-white">
                    {item.content}
                  </MandarinText>
                </View>
              </View>
            )
          )}
        </View>
        <MandarinText className="text-4xl font-bold text-right mr-12 mt-4">
          "
        </MandarinText>
        <View className="w-full border-b border-gray-300" />
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-4">
          이런 대화를 했어요
        </MandarinText>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportResponse.report.summary}
        </MandarinText>
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-8">
          대화를 분석해 봤어요
        </MandarinText>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportResponse.report.report.analysis}
        </MandarinText>
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-8">
          이렇게는 어때요?
        </MandarinText>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportResponse.report.report.feedback}
        </MandarinText>
      </ScrollView>
    </SafeAreaView>
  );
}
