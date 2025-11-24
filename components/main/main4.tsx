import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "../ui/MandarinText";

export default function Main0() {
  return (
    <SafeAreaView>
      <View className="top-20 left-10">
        <MandarinText className="text-[41px] font-bold">당신의</MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#FB6CC9] text-[41px] font-bold">
            연애 데이터
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">
            는{"\n"}{" "}
          </MandarinText>
        </View>
        <View className="flex-row">
          <MandarinText className="text-[#89CB26] text-[41px] font-bold">
            가장 안전
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">합니다.</MandarinText>
        </View>
      </View>
    </SafeAreaView>
  );
}
