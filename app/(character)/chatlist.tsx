import ChatListPage from "@/components/chat/chatlistpage";
import Headers from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { Character } from "@/types/api";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatList() {
  const { character } = useLocalSearchParams<{ character: string }>();
  console.log(character);

  const parsedCharacter: Character = JSON.parse(character as string);
  console.log(parsedCharacter);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Headers>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/chatcreate",
              params: { characterId: String(parsedCharacter.characterId) },
            })
          }
        >
          <MandarinText className="text-4xl font-semibold">+</MandarinText>
        </Pressable>
      </Headers>
      <View className="flex-row items-center justify-between px-8 mt-4">
        <MandarinText className="text-4xl font-bold">
          {parsedCharacter.characterName}
        </MandarinText>
        <View className="bg-[#F6F5F3] py-2 px-4 rounded-full">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/char_profile",
                params: {
                  characterId: String(parsedCharacter.characterId),
                },
              })
            }
          >
            <MandarinText className="text-sm font-medium">
              프로필 보기
            </MandarinText>
          </Pressable>
        </View>
      </View>
      <ChatListPage characterId={parsedCharacter.characterId} />
    </SafeAreaView>
  );
}
