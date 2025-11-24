import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "../ui/MandarinText";

export default function Main0() {
  return (
    <SafeAreaView>
      <View className="top-20 left-10">
        <View className="flex-row">
          <MandarinText className="text-[#2673DD] text-[41px] font-bold">
            AI
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">가</MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          분석해주는
        </MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#2673DD] text-[41px] font-bold">
            리포트
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">
            를 통해{"\n"}
          </MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          나와 상대의
        </MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#B753FF] text-[41px] font-bold">
            연애 성향
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">
            을{"\n"}
          </MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          객관적으로
        </MandarinText>
        <MandarinText className="text-[41px] font-bold">
          파악하세요.
        </MandarinText>
      </View>
    </SafeAreaView>
  );
}
