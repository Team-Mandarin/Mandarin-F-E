// app/char_create_load.tsx

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MandarinText from "@/components/ui/MandarinText";

export default function CharacterCreateLoad() {
  const handleClose = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F9D97E]">
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* X 버튼 */}
        <Pressable 
          onPress={handleClose} 
          className="absolute top-4 left-4 z-10 p-2"
        >
          <Ionicons name="close" size={28} color="black" />
        </Pressable>

        {/* 메인 콘텐츠 */}
        <View className="flex-1 justify-center px-10">
          {/* 만다린 캐릭터 이미지 */}
          <View className="items-center mb-16">
            <Image
              source={require("@/assets/images/mandarin_large.png")}
              className="w-80 h-80"
              resizeMode="contain"
            />
          </View>

          {/* 텍스트 */}
          <View className="mb-8">
            <MandarinText className="text-[32px] font-bold text-black leading-tight">
              당신의
            </MandarinText>
            <MandarinText className="text-[32px] font-bold text-[#3177FA] leading-tight">
              만다린<MandarinText className="text-[32px] font-bold text-black">이</MandarinText>
            </MandarinText>
          </View>

          <View className="mb-8">
            <MandarinText className="text-[32px] font-bold text-black leading-tight">
              생성 중입니다.
            </MandarinText>
          </View>

          <View>
            <MandarinText className="text-[32px] font-bold text-[#3177FA] leading-tight">
              잠시만
            </MandarinText>
            <MandarinText className="text-[32px] font-bold text-black leading-tight">
              기다려주세요.
            </MandarinText>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

