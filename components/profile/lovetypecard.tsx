import ArrowIcon from "@/assets/svg/arrow.svg";
import { router } from "expo-router";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";

export default function LoveTypeCard({
  image,
}: {
  image: ImageSourcePropType;
}) {
  return (
    <View className="bg-white w-[80%] mx-auto mt-8 rounded-2xl p-4 relative">
      <View className="absolute top-4 right-4">
        <Pressable onPress={() => router.push("/profilelovetype")}>
          <ArrowIcon width={12} height={24} />
        </Pressable>
      </View>
      <Image
        source={image}
        resizeMode="contain"
        className="h-[140px] aspect-square mx-auto my-4"
      />
    </View>
  );
}
