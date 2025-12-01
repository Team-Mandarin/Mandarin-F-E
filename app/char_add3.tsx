// app/char_add3.tsx

import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";

const MAX_CHARACTERS = 2000;

export default function CharacterAdd3() {
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!history.trim()) {
      Toast.show({
        type: "login",
        text1: "히스토리를 입력해주세요",
        visibilityTime: 3000,
      });
      return;
    }

    console.log("히스토리:", history);
    
    // char_add4로 이동
    router.push("/char_add4");
  };

  const handleTextChange = (text: string) => {
    if (text.length <= MAX_CHARACTERS) {
      setHistory(text);
    }
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      <Header 
        showBackButton={true} 
        onBack={handleBack} 
        className="bg-[#FCFCFC]" 
      />
      
      <ScrollView 
        className="flex-1 px-5" 
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {/* 1. 제목 및 설명 */}
        <View className="mt-5 mb-6 pl-5">
          <MandarinText className="text-[32px] font-bold mb-2">
            히스토리 입력
          </MandarinText>
          <MandarinText className="text-[14px] font-bold text-black leading-5">
            당신의 연인에 대한 모든 이야기, 만다린에게 들려주세요.
          </MandarinText>
          <MandarinText className="text-[14px] font-medium text-black leading-5 mt-3">
            자세하게 말할수록 실제 연인과 비슷해지는 대화를 할 수 있어요.
          </MandarinText>
          <MandarinText className="text-[14px] font-medium text-black leading-5 mt-3">
            가장 기억에 남는 연애 초기 에피소드부터, 최근 당신이 해결하고 싶었던 크고 작은 갈등까지 모든 것을 자세히 적어주세요.
          </MandarinText>
        </View>

        {/* 2. 텍스트 입력 영역 */}
        <View className="mb-4">
          <TextInput
            placeholder="만다린에게 알려주세요."
            placeholderTextColor="#9999A9"
            value={history}
            onChangeText={handleTextChange}
            multiline={true}
            textAlignVertical="top"
            className="w-full h-[400px] bg-[#F2F2F2] rounded-2xl p-4 text-[16px] text-gray-800"
            style={{ fontFamily: "Default-Font" }}
          />
          
          {/* 글자 수 카운트 */}
          <View className="items-end mt-2 pr-2">
            <MandarinText className="text-[14px] text-gray-500">
              {history.length} / {MAX_CHARACTERS}자
            </MandarinText>
          </View>
        </View>

        {/* 3. 계속하기 버튼 */}
        <View className="w-[325px] self-center mt-5 mb-10">
          <Button
            textClassName="text-white"
            label="계속하기"
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </View>
  );
}
