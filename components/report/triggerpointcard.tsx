import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function TriggerPointCard({
  keyword,
  percentage,
  className,
  onPress,
}: {
  keyword: string;
  percentage: string;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <View
      className={`w-80 h-72 py-8 px-8 mx-auto rounded-3xl justify-between mt-6 ${className}`}
    >
      <MandarinText className="text-2xl font-bold">{keyword}</MandarinText>
      <View>
        <MandarinText className="text-lg font-semibold">위험도</MandarinText>
        <View className="flex-row items-center">
          <View className="flex-1 h-3 bg-[#FFD0D0] rounded-full overflow-hidden">
            <View
              className="h-full bg-[#FF7C7C] rounded-full"
              style={{ width: `${Number(percentage)}%` }}
            />
          </View>
          <MandarinText className="ml-3 text-sm font-semibold text-[#8E8E8E]">
            {percentage}%
          </MandarinText>
        </View>
      </View>
      <Pressable onPress={onPress}>
        <MandarinText className="text-medium text-center font-semibold text-[#6084ED]">
          자세히 보기
        </MandarinText>
      </Pressable>
    </View>
  );
}
