// app/(character)/char_profile.tsx

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/ui/Button";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";

// ============================================
// 타입 정의 (추후 백엔드 연동 시 별도 파일로 분리 가능)
// ============================================

interface CharacterProfile {
  id: number;
  name: string;
  age: number;
  imageUrl?: string;
  dateMet: string; // YYYY-MM-DD 형식
  relationshipType: "썸" | "연애" | "결별";
  loveType: string; // 연애 타입 (예: 블러드 오렌지)
}

interface CharacterRelation {
  history: string; // 히스토리 텍스트
  personality: string; // 말투, 성격 텍스트
}

interface AICharacterSummary {
  history: string;
  personality: string;
}

// ============================================
// 임시 데이터 (추후 백엔드 API로 대체)
// ============================================

// 캐릭터 프로필 임시 데이터
const MOCK_CHARACTER_PROFILES: Record<number, CharacterProfile> = {
  1: {
    id: 1,
    name: "안도현",
    age: 25,
    imageUrl: "https://via.placeholder.com/150",
    dateMet: "2024-11-23",
    relationshipType: "썸",
    loveType: "블러드 오렌지",
  },
  2: {
    id: 2,
    name: "성윤수",
    age: 27,
    imageUrl: undefined,
    dateMet: "2024-08-15",
    relationshipType: "연애",
    loveType: "레몬",
  },
  3: {
    id: 3,
    name: "이동근",
    age: 24,
    imageUrl: "https://via.placeholder.com/150",
    dateMet: "2024-06-01",
    relationshipType: "결별",
    loveType: "자몽",
  },
  4: {
    id: 4,
    name: "정민서",
    age: 26,
    imageUrl: "https://via.placeholder.com/150",
    dateMet: "2024-09-10",
    relationshipType: "연애",
    loveType: "만다린",
  },
  5: {
    id: 5,
    name: "제연우",
    age: 23,
    imageUrl: undefined,
    dateMet: "2024-10-05",
    relationshipType: "썸",
    loveType: "유자",
  },
};

// AI 요약 임시 데이터 (추후 LLM API로 대체)
const MOCK_AI_SUMMARY: Record<number, AICharacterSummary> = {
  1: {
    history:
      "Lorem ipsum dolor sit amet consectetur. Maecenas id amet sed suscipit accumsan egestas. Pulvinar a tortor eu purus. Odio sed tempor tristique fusce nullam eu. Sed sit fames dolor leo vitae felis habitant. Diam interdum quis augue fusce viverra mollis parturient consectetur. Consectetur imperdiet nunc at leo eget dictumst enim ullamcorper. O···",
    personality:
      "Lorem ipsum dolor sit amet consectetur. Maecenas id amet sed suscipit accumsan egestas. Pulvinar a tortor eu purus. Odio sed tempor tristique fusce nullam eu. Sed sit fames dolor leo vitae felis habitant. Diam interdum quis augue fusce viverra mollis parturient consectetur. Consectetur imperdiet nunc at leo eget dictumst enim ullamcorper. O···",
  },
  2: {
    history: "성윤수님과의 관계는 2024년 8월에 시작되었습니다...",
    personality: "차분하고 배려심이 깊은 성격으로...",
  },
  3: {
    history: "이동근님과의 추억은 2024년 여름부터...",
    personality: "활발하고 유머러스한 성격...",
  },
  4: {
    history: "정민서님과는 2024년 가을에 만나...",
    personality: "따뜻하고 다정한 성격...",
  },
  5: {
    history: "제연우님과의 만남은 특별했습니다...",
    personality: "조용하지만 깊이 있는 성격...",
  },
};

// ============================================
// API 함수 (추후 실제 백엔드 연동 시 구현)
// ============================================

/**
 * 캐릭터 프로필 조회 API
 * @param characterId 캐릭터 ID
 * @returns CharacterProfile
 * 
 * TODO: 추후 Spring Boot API 연동
 * GET /api/characters/{characterId}
 */
async function fetchCharacterProfile(characterId: number): Promise<CharacterProfile | null> {
  // 임시: Mock 데이터 반환
  // 추후: axios.get(`${API_BASE_URL}/api/characters/${characterId}`)
  return MOCK_CHARACTER_PROFILES[characterId] || null;
}

/**
 * AI 캐릭터 요약 조회 API
 * @param characterId 캐릭터 ID
 * @returns AICharacterSummary
 * 
 * TODO: 추후 LLM API 연동
 * GET /api/characters/{characterId}/ai-summary
 */
async function fetchAISummary(characterId: number): Promise<AICharacterSummary | null> {
  // 임시: Mock 데이터 반환
  // 추후: LLM API 호출로 대체
  return MOCK_AI_SUMMARY[characterId] || null;
}

// ============================================
// 컴포넌트
// ============================================

type TabType = "profile" | "relation";

export default function CharacterProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const characterId = parseInt(id || "1", 10);
  const { setEditMode, initializeEditData } = useCharacterCreate();

  // 상태 관리
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [aiSummary, setAISummary] = useState<AICharacterSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [profileData, summaryData] = await Promise.all([
          fetchCharacterProfile(characterId),
          fetchAISummary(characterId),
        ]);
        setProfile(profileData);
        setAISummary(summaryData);
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
    if (!profile) return;
    
    // 편집 모드 설정
    setEditMode(true, characterId);
    
    // 기존 캐릭터 데이터를 Context에 저장
    // relationshipType 변환 (한글 -> 영문)
    const relationshipTypeMap: Record<string, "SUM" | "LOVE" | "BREAKUP"> = {
      "썸": "SUM",
      "연애": "LOVE",
      "결별": "BREAKUP",
    };
    
    initializeEditData({
      name: profile.name,
      age: String(profile.age),
      relationshipType: relationshipTypeMap[profile.relationshipType] || null,
      dateMet: profile.dateMet ? new Date(profile.dateMet) : null,
      characterImage: profile.imageUrl || null,
    });
    
    console.log("편집 화면으로 이동");
    router.push("/char_add1");
  };

  const handleStartSimulation = () => {
    console.log("시뮬레이션 시작:", characterId);
    // TODO: 추후 채팅/시뮬레이션 화면으로 이동
    // router.push(`/chat_room?id=${characterId}`);
  };

  const defaultImage = require("@/assets/images/default_profile_img.png");
  const displayImage = profile?.imageUrl ? { uri: profile.imageUrl } : defaultImage;

  if (isLoading || !profile) {
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
          <MandarinText className="text-[16px] text-black">편집</MandarinText>
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* 프로필 이미지 */}
        <View className="items-center mt-4 mb-4">
          <View className="w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-200">
            <Image
              source={displayImage}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* 이름 */}
        <View className="items-center mb-6">
          <MandarinText className="text-[24px] font-bold text-black">
            {profile.name}
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
                activeTab === "profile" ? "text-[#FF9D00] font-bold" : "text-gray-400"
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
                activeTab === "relation" ? "text-[#FF9D00] font-bold" : "text-gray-400"
              }`}
            >
              관계
            </MandarinText>
          </Pressable>
        </View>

        {/* 탭 콘텐츠 */}
        {activeTab === "profile" ? (
          <ProfileTabContent profile={profile} />
        ) : (
          <RelationTabContent aiSummary={aiSummary} />
        )}
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-[#FCFCFC]">
        <Button
          label="시뮬레이션 시작"
          onPress={handleStartSimulation}
          textClassName="text-white"
        />
      </View>
    </SafeAreaView>
  );
}

// ============================================
// 프로필 탭 콘텐츠
// ============================================

function ProfileTabContent({ profile }: { profile: CharacterProfile }) {
  const infoItems = [
    { label: "나이", value: `${profile.age}세` },
    { label: "만난 날짜", value: profile.dateMet },
    { label: "관계 유형", value: profile.relationshipType },
    { label: "연애 타입", value: profile.loveType },
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

function RelationTabContent({ aiSummary }: { aiSummary: AICharacterSummary | null }) {
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
          {aiSummary?.history || "AI 요약을 생성 중입니다..."}
        </MandarinText>
      </View>

      {/* 말투, 성격 섹션 */}
      <View className="mb-6">
        <MandarinText className="text-[16px] font-bold text-black mb-2">
          말투, 성격
        </MandarinText>
        <MandarinText className="text-[14px] text-gray-600 leading-6">
          {aiSummary?.personality || "AI 요약을 생성 중입니다..."}
        </MandarinText>
      </View>
    </View>
  );
}

