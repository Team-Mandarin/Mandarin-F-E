import { router } from "expo-router";
import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface LovetypeInfoCardProps {
  loveTypeId: number;
  name: string;
  image: ImageSourcePropType;
}

export default function LovetypeInfoCard({
  loveTypeId,
  name,
  image,
}: LovetypeInfoCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/lovetypedetail",
          params: { loveTypeId: loveTypeId },
        })
      }
    >
      <View className="flex-1 w-42 h-42 bg-gray-100 rounded-2xl p-4 my-4">
        <View className="items-center mb-6">
          <Image
            source={image}
            style={{ height: 128, aspectRatio: 1 }}
            resizeMode="contain"
          />
        </View>
        <MandarinText className="text-2xl font-bold text-center">
          {name}
        </MandarinText>
      </View>
    </Pressable>
  );
}
