import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function CharacterAdd4() {
  const insets = useSafeAreaInsets();

  // [수정 1] uploadedFile을 Context인 data에서 직접 가져옵니다.
  const { data, updateData, isEditMode, resetData } = useCharacterCreate();

  // [수정 1] 불필요한 로컬 state 삭제 (const [uploadedFile, setUploadedFile]...)

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // [추가] 로딩 상태

  // 편집 모드 등 초기화 로직은 Context 데이터가 있으므로 useEffect 불필요

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
    router.replace("/(tabs)/chat");
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain", // 텍스트 파일만
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        // [수정 2] 파일의 이름이 아닌 'URI(경로)'를 Context에 저장
        const fileUri = result.assets[0].uri;
        updateData({ uploadedFile: fileUri });
        console.log("업로드된 파일 URI:", fileUri);
      }
    } catch (error) {
      console.error("파일 선택 오류:", error);
    }
  };

  const handleNext = () => {
    router.push("/char_add5");
  };

  // 파일명 표시를 위한 헬퍼 변수
  const displayFileName = data.uploadedFile
    ? data.uploadedFile.split("/").pop()
    : "텍스트 파일 업로드";

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
        <View className="mt-5 mb-6 pl-5">
          <MandarinText className="text-[32px] font-bold mb-2">
            대화 내용 입력
          </MandarinText>
          {/* 내용 추가 */}
        </View>

        {/* 2. 파일 업로드 버튼 */}
        <Pressable
          onPress={handleFilePick}
          className="flex-row items-center justify-between mx-5 px-4 py-4 bg-white border border-gray-200 rounded-2xl"
        >
          <View className="flex-row items-center flex-1">
            <Ionicons name="attach" size={24} color="#9999A9" />
            <MandarinText
              className="text-[16px] text-[#9999A9] ml-3"
              numberOfLines={1}
            >
              {/* [UI 수정] Context 데이터를 기반으로 파일명 표시 */}
              {displayFileName}
            </MandarinText>
          </View>
          <Ionicons name="add" size={24} color="black" />
        </Pressable>

        {/* 2-1. 개인정보 처리 동의 체크박스 */}
        <View className="mx-5 mt-5 px-4">
          <CheckBox
            label="[필수] 연애 상대방과의 관계 분석을 위해 대화 텍스트 데이터 사용 및 마스킹 처리에 동의합니다."
            checked={isPrivacyAgreed}
            onCheckedChange={setIsPrivacyAgreed}
            labelClassName="text-[13px]"
          />
        </View>
      </ScrollView>

      {/* 3. 생성하기/저장하기 버튼 - 하단 고정 */}
      <View
        className="w-[325px] self-center mb-10"
        style={{ paddingBottom: insets.bottom }}
      >
        {/* [수정 4] 로딩 중일 때는 인디케이터 표시 */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF9D00" />
        ) : (
          <Button
            textClassName="text-white"
            label={isEditMode ? "저장하기" : "계속하기"}
            onPress={handleNext}
          />
        )}
      </View>

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
