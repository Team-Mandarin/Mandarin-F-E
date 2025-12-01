// app/char_add2.tsx

import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";

export default function CharacterAdd2() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      <Header 
        showBackButton={true} 
        onBack={handleBack} 
        className="bg-[#FCFCFC]" 
      />
      
      <View className="flex-1 px-5 mt-5">
        <View className="pl-5">
          <MandarinText className="text-[32px] font-bold mb-1">
            캐릭터 생성 2단계
          </MandarinText>
          <MandarinText className="text-[12px] text-[#737373]">
            추가 정보를 입력해주세요.
          </MandarinText>
        </View>
      </View>
    </View>
  );
}

