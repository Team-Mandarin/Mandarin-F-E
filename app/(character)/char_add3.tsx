// app/(character)/char_add3.tsx

import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";

const MAX_CHARACTERS = 2000;

export default function CharacterAdd3() {
  const insets = useSafeAreaInsets();
  const { data, updateData, isEditMode, resetData } = useCharacterCreate();
  const [history, setHistory] = useState("");
  const [showExitDialog, setShowExitDialog] = useState(false);

  // 편집 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && data.history) {
      setHistory(data.history);
    }
  }, [isEditMode]);

  const handleBack = () => {
    if (isEditMode) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    resetData();
    // 모든 편집 화면 나가기
    router.replace("/(tabs)/chat");
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

    // Context에 데이터 저장
    updateData({ history });
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
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
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

      {/* 나가기 확인 다이얼로그 (편집 모드) */}
      <ConfirmDialog
        visible={showExitDialog}
        title="정말 나가시나요?"
        message={`지금 나가시면 캐릭터 수정을 처음부터\n다시 시작해야해요.`}
        confirmText="나가기"
        cancelText="취소"
        onConfirm={handleExitConfirm}
        onCancel={() => setShowExitDialog(false)}
      />
    </SafeAreaView>
  );
}

