import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface DotProps {
  page: number;
}

export default function Dot({ page }: DotProps) {
  return (
    <View className="absolute bottom-12 left-0 right-0 px-6 items-center gap-6">
      <View className="flex-row gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <View
            key={index}
            style={{
              height: 8,
              borderRadius: 9999,
              width: page === index ? 16 : 8,
              backgroundColor: page === index ? "#FFD67E" : "#CACACA",
            }}
          />
        ))}
      </View>

      <Pressable
        className="w-full bg-[#FF9D00] py-4 rounded-full items-center active:bg-orange-600"
        onPress={() => router.push("/signup")}
      >
        <MandarinText className="text-white text-lg font-bold">
          다음
        </MandarinText>
      </Pressable>
    </View>
  );
}
