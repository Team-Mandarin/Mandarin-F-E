import { CharacterReport } from "@/types/api";
import { View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function TriggerPoint({ report }: { report: CharacterReport }) {
  return (
    <>
      <MandarinText className="text-base font-medium mt-6 mb-2">
        가장 부정적으로 반응했던 키워드
      </MandarinText>
      <View className="bg-[#FF7C7C] rounded-lg w-40 py-3">
        <MandarinText className="text-white text-xs font-medium text-center">
          {report.conflictName}
        </MandarinText>
      </View>
      <MandarinText className="text-lg font-semibold mb-2 mt-6">
        위험도
      </MandarinText>
      <View className="flex-row items-center">
        <View className="flex-1 h-3 bg-[#FFD0D0] rounded-full overflow-hidden">
          <View
            className="h-full bg-[#FF7C7C] rounded-full"
            style={{ width: `${report.dangerLevel}%` }}
          />
        </View>
        <MandarinText className="ml-3 text-sm font-semibold text-[#8E8E8E]">
          {report.dangerLevel}%
        </MandarinText>
      </View>
    </>
  );
}
