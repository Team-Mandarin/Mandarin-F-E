import ChatListItem from "@/components/ui/CharacterListItem";
import MandarinText from "@/components/ui/MandarinText";
import TabHeader from "@/components/ui/TabHeader";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 백엔드 연동 전 임시 데이터 타입 정의
interface Character {
  id : number;
  name : string;
  imageUrl? : string;
}

// 백엔드 연동 전 임시 데이터 (화면과 동일하게 5개)
const sampleCharacters : Character[] = [
  { id: 1, name: "안도현", imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "성윤수", imageUrl: undefined },
  { id: 3, name: "이동근", imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "정민서", imageUrl: "https://via.placeholder.com/150" },
  { id: 5, name: "제연우", imageUrl: undefined },
];

export default function ChatTab() {
  // 백엔드 API를 통해 캐릭터 데이터를 불러와 저장 (아직은 구현 x)
  const [characters, setCharacters] = useState<Character[]>(sampleCharacters);

  // '+' 버튼 클릭 시 실행할 함수 (캐릭터 생성 화면으로 이동)
  const handleCreateCharacter = () => {
    console.log("캐릭터 생성 화면으로 이동");
    // 추후 캐릭터 생성 화면으로 이동하는 로직 구현
    // router.push("/chat_create");
    router.push("/char_add1");
  }

  // 캐릭터 상세 화면으로 이동하는 함수
  const handleCharacterDetail = (characterId: number) => {
    console.log(`캐릭터 ${characterId} 상세 화면으로 이동`);
    // 추후 캐릭터 상세 화면으로 이동하는 로직 구현
    // router.push(`/chat/${characterId}번 캐릭터와의 채팅 화면`);
  }

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
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ChatListItem
            characterId={item.id}
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

