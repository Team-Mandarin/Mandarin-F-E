import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "../ui/MandarinText";

export default function Main0() {
  return (
    <SafeAreaView>
      <View className="top-20 left-10">
        <View className="flex-row">
          <MandarinText className="text-[#FF9D00] text-[41px] font-bold">
            만
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">
            약{"\n"}
          </MandarinText>
        </View>
        <View className="flex-row">
          <MandarinText className="text-[#FF9D00] text-[41px] font-bold">
            다
          </MandarinText>
          <MandarinText className="text-[41px] font-bold">
            른 선택을
          </MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          했다면,{"\n"}{" "}
        </MandarinText>
        <View className="flex-row">
          <MandarinText className="text-[41px] font-bold">우</MandarinText>
          <MandarinText className="text-[#FF9D00] text-[41px] font-bold">
            린
          </MandarinText>
        </View>
        <MandarinText className="text-[41px] font-bold">
          어떻게 됐을까?
        </MandarinText>
      </View>
    </SafeAreaView>
  );
}
