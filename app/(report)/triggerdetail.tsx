import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TriggerDetail() {
  const { report } = useLocalSearchParams<{ report: string }>();
  const reportData = JSON.parse(report as string);
  console.log(reportData);

  return (
    <SafeAreaView>
      <Header title={reportData.conflictName} className="font-medium" />
      <MandarinText className="text-3xl ml-8 mt-4 mb-2">
        여기서 그랬어요
      </MandarinText>
      <MandarinText className="text-lg ml-8 text-[#8E8E8E]">
        갈등을 유발했던 메시지를 보여드릴게요.
      </MandarinText>
      <View className="w-full h-3 bg-[#E3E3E3] mt-4 mb-4" />
      <MandarinText>메시지 올 자리</MandarinText>
      <View className="w-full h-3 bg-[#E3E3E3] mt-4 mb-4" />
      <MandarinText className="text-3xl ml-8 mt-4 mb-2">
        이래서 그랬어요
      </MandarinText>
      <MandarinText className="text-lg ml-8 text-[#8E8E8E]">
        AI가 분석한 원인을 설명해드릴게요.
      </MandarinText>
      <MandarinText className="text-base mx-8 mt-2">
        {reportData.description}
      </MandarinText>
      <View className="w-full h-3 bg-[#E3E3E3] mt-4 mb-4" />
      <MandarinText className="text-3xl ml-8 mt-4 mb-2">
        다음엔 이렇게 해보세요
      </MandarinText>
      <MandarinText className="text-lg ml-8 text-[#8E8E8E]">
        AI가 구체적인 개선 전략을 제시해드릴게요.
      </MandarinText>
      <MandarinText className="text-base mx-8 mt-2">
        {reportData.solution}
      </MandarinText>
    </SafeAreaView>
  );
}
