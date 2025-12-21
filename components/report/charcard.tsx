import { useCharId } from "@/contexts/CharIdContext";
import { SERVER_URL } from "@/lib/api";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function CharCard({ character }: { character: any }) {
  const { setCharId } = useCharId();

  return (
    <View className="flex-row w-full justify-between px-12 items-center mb-8">
      <View className="flex-row items-center gap-4">
        {character.characterImg && (
          <Image
            source={{
              uri: `${SERVER_URL}/uploads/${character.characterImg}`,
            }}
            className="w-12 h-12 rounded-full"
          />
        )}
        <MandarinText className="text-2xl font-semibold">
          {character.characterName}
        </MandarinText>
      </View>
      <Pressable
        onPress={() => {
          setCharId(character.characterId);
          router.back();
        }}
      >
        <View className="bg-gray-300 rounded-2xl px-6 py-2">
          <MandarinText className="text-xl font-semibold">선택</MandarinText>
        </View>
      </Pressable>
    </View>
  );
}
