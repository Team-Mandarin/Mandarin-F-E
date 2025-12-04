// app/(character)/chatbot.tsx

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MandarinText from "@/components/ui/MandarinText";

export default function Chatbot() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleBack = () => {
    // chat_load에서 replace로 왔기 때문에 뒤로갈 화면이 없음
    // 탭의 채팅 화면으로 이동
    router.replace("/(tabs)/chat");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      {/* 헤더 */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={handleBack} className="p-2 -ml-2">
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <MandarinText className="text-[18px] font-bold text-black ml-2">
          채팅
        </MandarinText>
      </View>

      {/* 메인 콘텐츠 */}
      <View className="flex-1 items-center justify-center px-6">
        <MandarinText className="text-[18px] text-gray-500 text-center">
          캐릭터 ID: {id}
        </MandarinText>
        <MandarinText className="text-[16px] text-gray-400 text-center mt-2">
          채팅 화면이 준비 중입니다.
        </MandarinText>
      </View>
    </SafeAreaView>
  );
}

