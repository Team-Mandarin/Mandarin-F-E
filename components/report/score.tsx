import { View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function Score({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <View>
      <MandarinText className="text-sm font-medium mt-2 ml-2">
        {label}
      </MandarinText>
      <View className="flex-row items-center w-72">
        <View
          className="h-2 bg-[#FF9D00] rounded-full"
          style={{ width: `${score}%` }}
        />
        <MandarinText className="ml-3 text-sm font-semibold text-[#8E8E8E]">
          {score}%
        </MandarinText>
      </View>
    </View>
  );
}
