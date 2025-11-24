import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "../ui/MandarinText";

export default function Main0() {
  return (
    <SafeAreaView>
      <View className="top-20 left-10">
        <View className="flex-row">
          <MandarinText className="text-[#FB6CC9] text-[41px]">
            나의 연인
          </MandarinText>
          <MandarinText className="text-[41px]">을</MandarinText>
        </View>
        <MandarinText className="text-[41px]">쏙 빼닮은{"\n"}</MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#89CB26] text-[41px]">
            AI 캐릭터
          </MandarinText>
          <MandarinText className="text-[41px]">를</MandarinText>
        </View>
        <MandarinText className="text-[41px]">만드세요.</MandarinText>
      </View>
    </SafeAreaView>
  );
}
