import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "../ui/MandarinText";

export default function Main0() {
  return (
    <SafeAreaView>
      <View className="top-20 left-10">
        <MandarinText className="text-[41px] font-bold">연인에게</MandarinText>
        <MandarinText className="text-[41px] font-bold">
          말하기 전에, {"\n"}{" "}
        </MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#FDBD35] text-[41px] font-bold">
            만다린
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">과</MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          먼저{"\n"}
        </MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[#2673DD] text-[41px] font-bold">
            최적의 대답
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">을</MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">찾으세요.</MandarinText>
      </View>
    </SafeAreaView>
  );
}
