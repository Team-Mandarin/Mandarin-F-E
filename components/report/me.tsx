import { ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import Juice from "./juice";
import LineChart from "./LineChart";
import Score from "./score";

export default function Me() {
  // 예시 점수 데이터 (7개)
  const scoreData = [65, 78, 72, 85, 80, 92, 88, 50];
  const scoreLabels = ["1일", "2일", "3일", "4일", "5일", "6일", "7일", "8일"];

  return (
    <ScrollView
      className="flex-1 bg-[#f6f5f3] my-6"
      contentContainerStyle={{ alignItems: "center", gap: 16 }}
    >
      <Juice />
      <View className="bg-white w-96 rounded-2xl p-6">
        <MandarinText className="text-2xl font-semibold">
          나의 최근 대화 점수
        </MandarinText>
        <MandarinText className="text-xl font-medium mt-8">
          관계 빌드업 점수
        </MandarinText>
        <Score label="나의 최근 대화 점수" score={100} />
        <Score label="관계 유지력" score={72} />
        <Score label="선택 일관성" score={40} />
        <MandarinText className="text-xl font-medium mt-8">
          후회 회복력 점수
        </MandarinText>
        <Score label="후회 해소도" score={100} />
        <Score label="표현 성숙도" score={72} />
        <Score label="관계 회복력" score={40} />
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
