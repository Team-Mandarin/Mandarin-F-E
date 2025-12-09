import ChatListItem from "@/components/ui/CharacterListItem";
import MandarinText from "@/components/ui/MandarinText";
import TabHeader from "@/components/ui/TabHeader";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// 백엔드 연동 전 임시 데이터 타입 정의
interface Character {
  characterId: number;
  name: string;
  imageUrl?: string;
}

// 백엔드 연동 전 임시 데이터 (3개)
const sampleCharacters: Character[] = [
  { characterId: 0, name: "안도현", imageUrl: undefined },
  { characterId: 1, name: "성윤수", imageUrl: undefined },
  { characterId: 2, name: "이동근", imageUrl: undefined },
];

export default function ChatTab() {
  // 백엔드 API를 통해 캐릭터 데이터를 불러와 저장 (아직은 구현 x)
  const [characters, setCharacters] = useState<Character[]>(sampleCharacters);

  // 최대 캐릭터 생성 가능 개수
  const MAX_CHARACTERS = 5;

  // '+' 버튼 클릭 시 실행할 함수 (캐릭터 생성 화면으로 이동)
  const handleCreateCharacter = () => {
    // 캐릭터가 최대 개수일 경우 토스트 메시지 표시
    if (characters.length >= MAX_CHARACTERS) {
      Toast.show({
        type: "login",
        text1: "캐릭터는 최대 5개까지 생성 가능합니다",
        visibilityTime: 3000,
      });
      return;
    }

    console.log("캐릭터 생성 화면으로 이동");
    // 추후 캐릭터 생성 화면으로 이동하는 로직 구현
    // router.push("/chat_create");
    router.push("/char_add1");
  };

  // 캐릭터 상세 화면으로 이동하는 함수
  const handleCharacterDetail = (characterId: number) => {
    console.log(`캐릭터 ${characterId} 상세 화면으로 이동`);
    router.push({
      pathname: "/chatlist" as const,
      params: { character: JSON.stringify(characters[characterId]) },
    } as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* 1. 상단 탭 헤더 */}
      <TabHeader
        title="채팅"
        showRightButton={true}
        onRightPress={handleCreateCharacter}
        className="bg-transparent"
      />

      {/* 2. 캐릭터 카운트 카드 */}
      <View className="mt-5 mx-4 mb-2.5 px-4 py-3 bg-white rounded-[15px]">
        <MandarinText className="text-base font-medium text-gray-500">
          캐릭터 ({characters.length})
        </MandarinText>
      </View>

      {/* 3. 캐릭터 목록 */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.characterId)}
        renderItem={({ item }) => (
          <ChatListItem
            characterId={item.characterId}
            name={item.name}
            imageUrl={item.imageUrl || ""}
            onPress={handleCharacterDetail}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}
