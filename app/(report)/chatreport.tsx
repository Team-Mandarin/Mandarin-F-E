import ScoreBarChart from "@/components/report/ScoreBarChart";
import ScoreCircle from "@/components/report/ScoreCircle";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatReport() {
  const reportResponse = useLocalSearchParams<{ report: string }>();

  console.log(reportResponse);

  const { score, label_key, label_score, report_content } =
    useLocalSearchParams<{
      score: string;
      label_key: string;
      label_score: string;
      report_content: string;
    }>();

  const parsedReportContent = report_content
    ? JSON.parse(report_content)
    : {
        conversation_log: "",
        caution: { message: "", content: "" },
        suggestion: { message: "", content: "" },
      };

  const message = [
    {
      sender: "user",
      message: "안녕하세요",
    },
    {
      sender: "ai",
      message: "안녕하세요",
    },
    {
      sender: "user",
      message: "누구세요",
    },
    {
      sender: "ai",
      message: "나는 챗봇이야",
    },
    {
      sender: "user",
      message: "반가워요",
    },
    {
      sender: "ai",
      message: "나도 반가워",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView>
        <MandarinText className="text-2xl font-medium ml-8 mt-4">
          후회 회복력 점수 🖤
        </MandarinText>
        <View className="items-center mt-12">
          <ScoreCircle score={Number(score)} />
        </View>
        <View className="mt-12">
          <ScoreBarChart
            label_key={label_key ? JSON.parse(label_key) : []}
            label_score={label_score ? JSON.parse(label_score) : []}
            labels={["후회 해소도", "표현 성숙도", "관계 회복력"]}
          />
        </View>
        <View className="w-full border-b border-gray-200" />
        <MandarinText className="text-4xl font-bold text-left ml-12 mt-4">
          "
        </MandarinText>
        <View className="px-4 py-2">
          {message.map((item, index) =>
            item.sender === "ai" ? (
              // AI 메시지 - 왼쪽 정렬, 프로필 이미지 포함
              <View key={index} className="flex-row items-start mb-3">
                <Image
                  source={require("@/assets/images/character/4.jpeg")}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <View className="bg-[#F3F5F7] px-4 py-3 max-w-[70%] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
                  <MandarinText className="text-black">
                    {item.message}
                  </MandarinText>
                </View>
              </View>
            ) : (
              // User 메시지 - 오른쪽 정렬
              <View key={index} className="flex-row justify-end mb-3">
                <View className="bg-[#FF9D00] px-4 py-3 max-w-[70%] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl">
                  <MandarinText className="text-white">
                    {item.message}
                  </MandarinText>
                </View>
              </View>
            )
          )}
        </View>
        <MandarinText className="text-4xl font-bold text-right mr-12 mt-4">
          "
        </MandarinText>
        <View className="w-full border-b border-gray-200" />
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-4">
          이런 대화를 했어요
        </MandarinText>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportContent.conversation_log}
        </MandarinText>
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-8">
          주의할 필요가 있어요
        </MandarinText>
        <View className="flex-row justify-end mb-3 mr-8">
          <View className="bg-[#FF9D00] px-4 py-3 max-w-[70%] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl">
            <MandarinText className="text-white">
              {parsedReportContent.caution.message}
            </MandarinText>
          </View>
        </View>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportContent.caution.content}
        </MandarinText>
        <MandarinText className="text-2xl font-medium text-left ml-8 mt-8">
          이렇게는 어때요?
        </MandarinText>
        <View className="flex-row justify-end mb-3 mr-8">
          <View className="bg-[#93CA40] px-4 py-3 max-w-[70%] rounded-tl-2xl rounded-bl-2xl rounded-br-2xl">
            <MandarinText className="text-white">
              {parsedReportContent.suggestion.message}
            </MandarinText>
          </View>
        </View>
        <MandarinText className="text-base font-light text-left mx-8 mt-4 mb-4">
          {parsedReportContent.suggestion.content}
        </MandarinText>
      </ScrollView>
    </SafeAreaView>
  );
}
