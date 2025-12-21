// app/(character)/char_profile.tsx

import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { SERVER_URL } from "@/lib/api";
import { chatService } from "@/services/chatService";
import { Character } from "@/types/api";

type TabType = "profile" | "relation";

export default function CharacterProfileScreen() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const { setEditMode, initializeEditData } = useCharacterCreate();

  // 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await chatService.getCharacter(parseInt(characterId));
        setCharacter(response.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [characterId]);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    if (!character) return;

    // 편집 모드 설정
    setEditMode(true, parseInt(characterId));

    // 기존 캐릭터 데이터를 Context에 저장
    // relationshipType 변환 (한글 -> 영문)
    const relationshipTypeMap: Record<string, "SUM" | "LOVE" | "BREAKUP"> = {
      썸: "SUM",
      연애: "LOVE",
      결별: "BREAKUP",
    };

    initializeEditData({
      name: character.characterName,
      age: String(character.characterAge),
      relationshipType: relationshipTypeMap[character.relationType] || null,
      dateMet: character.meetDate ? new Date(character.meetDate) : null,
      characterImage: `${SERVER_URL}/uploads/${character.characterImg}` || null,
    });

    console.log("편집 화면으로 이동");
    router.push("/char_add1");
  };

  const handleDelete = async () => {
    console.log("캐릭터 삭제:", characterId);
    await chatService.deleteCharacter(parseInt(characterId));
  };

  const handleStartSimulation = () => {
    console.log("시뮬레이션 시작:", characterId);
    router.push({
      pathname: "/chat_load",
      params: { id: String(characterId) },
    });
  };

  const hasImage = character?.characterImg;

  if (isLoading || !character) {
    return (
      <SafeAreaView className="flex-1 bg-[#FCFCFC] items-center justify-center">
        <MandarinText className="text-gray-500">로딩 중...</MandarinText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={handleBack} className="p-2 -ml-2">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <Pressable onPress={handleEdit}>
          <MandarinText className="text-[18px] text-black">편집</MandarinText>
        </Pressable>
        <Pressable onPress={handleDelete}>
          <MandarinText className="text-[18px] text-red">삭제</MandarinText>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* 프로필 이미지 */}
        <View className="items-center mt-4 mb-4">
          <View className="w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200 items-center justify-center">
            {hasImage ? (
              <Image
                source={{
                  uri: `${SERVER_URL}/uploads/${character.characterImg}`,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={60} color="#9CA3AF" />
            )}
          </View>
        </View>

        {/* 이름 */}
        <View className="items-center mb-6">
          <MandarinText className="text-[24px] font-bold text-black">
            {character.characterName}
          </MandarinText>
        </View>

        {/* 탭 바 */}
        <View className="flex-row border-b border-gray-200 mx-6">
          <Pressable
            onPress={() => setActiveTab("profile")}
            className={`flex-1 items-center pb-3 ${
              activeTab === "profile" ? "border-b-2 border-[#FF9D00]" : ""
            }`}
          >
            <MandarinText
              className={`text-[16px] ${
                activeTab === "profile"
                  ? "text-[#FF9D00] font-bold"
                  : "text-gray-400"
              }`}
            >
              프로필
            </MandarinText>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("relation")}
            className={`flex-1 items-center pb-3 ${
              activeTab === "relation" ? "border-b-2 border-[#FF9D00]" : ""
            }`}
          >
            <MandarinText
              className={`text-[16px] ${
                activeTab === "relation"
                  ? "text-[#FF9D00] font-bold"
                  : "text-gray-400"
              }`}
            >
              관계
            </MandarinText>
          </Pressable>
        </View>

        {/* 탭 콘텐츠 */}
        {activeTab === "profile" ? (
          <ProfileTabContent character={character} />
        ) : (
          <RelationTabContent character={character} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================
// 프로필 탭 콘텐츠
// ============================================

function ProfileTabContent({ character }: { character: Character }) {
  const relationshipTypeLabelMap: Record<string, string> = {
    0: "썸",
    1: "연애",
    2: "결별",
  };

  const lovetype = loveTypeInfo[character.loveType];

  const infoItems = [
    { label: "나이", value: `${character.characterAge}세` },
    { label: "만난 날짜", value: character.meetDate.slice(0, 10) },
    {
      label: "관계 유형",
      value:
        relationshipTypeLabelMap[character.relationType] ||
        character.relationType,
    },
    { label: "연애 타입", value: lovetype.name },
  ];

  return (
    <View className="px-6 pt-6">
      {infoItems.map((item, index) => (
        <View
          key={item.label}
          className={`flex-row justify-between py-5 ${
            index < infoItems.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <MandarinText className="text-[16px] text-black font-medium">
            {item.label}
          </MandarinText>
          <MandarinText className="text-[16px] text-gray-600">
            {item.value}
          </MandarinText>
        </View>
      ))}
    </View>
  );
}

// ============================================
// 관계 탭 콘텐츠
// ============================================

function RelationTabContent({ character }: { character: Character }) {
  return (
    <View className="px-6 pt-6">
      {/* AI 캐릭터 요약 헤더 */}
      <View className="flex-row items-center mb-4">
        <Image
          source={require("@/assets/images/ai_char_summary_icon.png")}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <MandarinText className="text-[16px] font-medium text-black ml-2">
          AI 캐릭터 요약
        </MandarinText>
      </View>

      {/* 히스토리 섹션 */}
      <View className="mb-6">
        <MandarinText className="text-[16px] font-bold text-black mb-2">
          히스토리
        </MandarinText>
        <MandarinText className="text-[14px] text-gray-600 leading-6">
          {character.historySum || "AI 요약을 생성 중입니다..."}
        </MandarinText>
      </View>

      {/* 말투, 성격 섹션 */}
      <View className="mb-6">
        <MandarinText className="text-[16px] font-bold text-black mb-2">
          말투, 성격
        </MandarinText>
        <MandarinText className="text-[14px] text-gray-600 leading-6">
          {"AI 요약을 생성 중입니다..."}
        </MandarinText>
      </View>
    </View>
  );
}
