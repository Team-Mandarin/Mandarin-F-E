// app/(character)/char_add4.tsx

import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";

export default function CharacterAdd4() {
  const insets = useSafeAreaInsets();
  const { data, updateData, isEditMode, resetData } = useCharacterCreate();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // 편집 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && data.uploadedFile) {
      setUploadedFile(data.uploadedFile);
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

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setUploadedFile(result.assets[0].name);
        console.log("업로드된 파일:", result.assets[0]);
      }
    } catch (error) {
      console.error("파일 선택 오류:", error);
    }
  };

  const handleCreate = () => {
    // Context에 데이터 저장
    updateData({ uploadedFile });

    // 캐릭터 생성/수정 완료
    Toast.show({
      type: "login",
      text1: isEditMode ? "캐릭터 수정이 완료되었습니다" : "캐릭터 생성이 완료되었습니다",
      visibilityTime: 3000,
    });

    // 데이터 초기화
    resetData();

    // chat.tsx로 이동 (탭 네비게이션의 chat으로)
    router.replace("/(tabs)/chat");
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
        {/* 1. 제목 */}
        <View className="mt-5 mb-6 pl-5">
          <MandarinText className="text-[32px] font-bold mb-2">
            대화 내용 입력
          </MandarinText>
          
          <MandarinText className="text-[14px] text-black leading-5 mb-4">
            [user_name]님의 연인과 나눴던 카카오톡 대화 내용을 업로드할 수 있어요.
          </MandarinText>

          <MandarinText className="text-[14px] text-black leading-5 mb-4">
            해당 절차는 선택사항이며 필수사항이 아닙니다.
          </MandarinText>

          <MandarinText className="text-[14px] text-black leading-5 mb-4">
            하지만 AI 말투 학습에 사용되는 주요 데이터이므로 높은 몰입감을 경험하고 싶으신 분은 업로드를 추천드립니다.
          </MandarinText>

          <MandarinText className="text-[14px] text-black leading-5 mb-4">
            대화에 포함된 주요 개인정보는 모두 마스킹하여 안전하게{"\n"}처리되니 안심하셔도 돼요.
          </MandarinText>

          <MandarinText className="text-[14px] text-black leading-5 mb-1">
            아래와 같은방법으로 대화 데이터를 다운로드할 수 있어요.
          </MandarinText>

          {/* 주황색 텍스트 */}
          <MandarinText className="text-[14px] text-[#FF9D00] leading-5 mb-4">
            대화방 {">"} 오른쪽 상단 석 삼자 모양 메뉴 {">"} 채팅방 설정{"\n"}{">"} 대화 내용 내보내기
          </MandarinText>

          <MandarinText className="text-[14px] text-black leading-5">
            다운로드한 카카오톡 대화 데이터 .txt 파일을{"\n"}아래 첨부 버튼을 통해 업로드해주세요.
          </MandarinText>
        </View>

        {/* 2. 파일 업로드 버튼 */}
        <Pressable
          onPress={handleFilePick}
          className="flex-row items-center justify-between mx-5 px-4 py-4 bg-white border border-gray-200 rounded-2xl"
        >
          <View className="flex-row items-center flex-1">
            <Ionicons name="attach" size={24} color="#9999A9" />
            <MandarinText className="text-[16px] text-[#9999A9] ml-3">
              {uploadedFile || "텍스트 파일 업로드"}
            </MandarinText>
          </View>
          <Ionicons name="add" size={24} color="black" />
        </Pressable>

        {/* 3. 생성하기/저장하기 버튼 */}
        <View className="w-[325px] self-center mt-auto pt-10 mb-10">
          <Button
            textClassName="text-white"
            label={isEditMode ? "저장하기" : "생성하기"}
            onPress={handleCreate}
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
    </View>
  );
}

