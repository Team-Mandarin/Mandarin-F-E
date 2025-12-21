import { useCharId } from "@/contexts/CharIdContext";
import { SERVER_URL } from "@/lib/api";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface CharacterCustom {
  characterId: number;
  characterName: string;
  characterImg: string | undefined;
}

export default function CharacterCard({
  characters,
}: {
  characters: CharacterCustom[];
}) {
  const { charId, setCharId } = useCharId();

  useEffect(() => {
    if (characters.length > 0 && charId === 0) {
      setCharId(characters[0].characterId);
    }
  }, [characters, charId, setCharId]);

  if (characters.length === 0) {
    return (
      <View>
        <MandarinText>캐릭터가 없습니다.</MandarinText>
      </View>
    );
  }

  // charId에 맞는 캐릭터 찾기, 없으면 첫 번째 캐릭터 사용
  const selectedCharacter =
    characters.find((char) => char.characterId === charId) || characters[0];

  return (
    <View className="flex-row w-full justify-between px-12 items-center">
      <View className="flex-row items-center gap-4">
        {selectedCharacter.characterImg && (
          <Image
            source={{
              uri: `${SERVER_URL}/uploads/${selectedCharacter.characterImg}`,
            }}
            className="w-12 h-12 rounded-full"
          />
        )}
        <MandarinText className="text-xl font-semibold">
          {selectedCharacter.characterName}
        </MandarinText>
      </View>
      <Pressable>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/charchange",
              params: {
                characters: JSON.stringify(characters),
              },
            })
          }
        >
          <View className="bg-[#F2F2F2] rounded-2xl px-6 py-2">
            <MandarinText className="text-xl font-semibold">변경</MandarinText>
          </View>
        </Pressable>
      </Pressable>
    </View>
  );
}
