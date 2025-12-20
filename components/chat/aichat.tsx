import { Image, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface AiChatProps {
  label: string;
  image?: string;
}

export default function AiChat({ label, image }: AiChatProps) {
  return (
    <View className="flex-row items-start mt-2 mb-2">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-10 h-10 rounded-full mr-2"
        />
      ) : (
        <View className="w-10 h-10 rounded-full mr-2" />
      )}
      <View className="bg-[#F3F5F7] px-4 py-3 max-w-64 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
        <MandarinText className="text-black text-sm">{label}</MandarinText>
      </View>
    </View>
  );
}
