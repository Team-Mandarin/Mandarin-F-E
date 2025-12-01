import ArrowIcon from "@/assets/svg/arrow.svg";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";

export default function LoveTypeCard({ loveType }: { loveType: number }) {
  const typeInfo = loveTypeInfo[loveType];
  return (
    <View className="bg-white w-[323px] mx-auto mt-8 rounded-2xl p-4 relative">
      <View className="absolute top-4 right-4">
        <Pressable onPress={() => router.push("/profilelovetype")}>
          <ArrowIcon width={12} height={24} />
        </Pressable>
      </View>
      <Image
        source={typeInfo.image}
        resizeMode="contain"
        className="h-[170px] aspect-square mx-auto my-4"
      />
    </View>
  );
}
