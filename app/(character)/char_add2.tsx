// app/(character)/char_add2.tsx

import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import LoveTypeButton from "@/components/lovetype/lovetypebutton";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { questions as allQuestions } from "@/constants/lovetypeData";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";

// id가 1, 5, 2, 10인 질문만 순서대로 가져오기
const selectedQuestionIds = [1, 5, 2, 10];
const questions = selectedQuestionIds.map(
  (id) => allQuestions.find((q) => q.id === id)!
);

export default function CharacterAdd2() {
  const insets = useSafeAreaInsets();
  const { data, updateData, isEditMode, resetData } = useCharacterCreate();
  const answers = data.loveTypeAnswers;
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleAnswerSelect = (questionId: number, selectedAnswer: number) => {
    updateData({
      loveTypeAnswers: {
        ...answers,
        [questionId]: selectedAnswer,
      },
    });
  };

  const handleNext = () => {
    // 모든 질문에 답변했는지 확인
    const allAnswered = Object.values(answers).every(
      (answer) => answer !== null
    );

    if (!allAnswered) {
      Toast.show({
        type: "login",
        text1: "모든 항목을 입력해주세요",
        visibilityTime: 3000,
      });
      return;
    }

    // 1. F0 or L1 5.A1 or C0 2. R1 or P0  10. O1 or E0
    const type1 = answers[1]! >= 2 ? 0 : 1;
    const type2 = answers[5]! >= 2 ? 1 : 0;
    const type3 = answers[2]! >= 2 ? 1 : 0;
    const type4 = answers[10]! >= 2 ? 1 : 0;

    const loveTypeBinary = `${type1}${type2}${type3}${type4}`;
    const loveType = parseInt(loveTypeBinary, 2);
    updateData({ loveType: loveType });

    console.log("러브타입:", loveType);

    // char_add3로 이동
    router.push("/char_add3");
  };

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
    router.back();
    router.back(); // char_add1도 나가기
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
        <View className="mt-5 mb-8 pl-5">
          <MandarinText className="text-[32px] font-bold mb-1">
            상대방 연애 타입
          </MandarinText>
          <MandarinText className="text-[12px] text-[#737373] leading-4">
            [user_name]님의 연인은 연애 시에 어떤 편인지{"\n"}
            질문을 읽고 가장 적절하게 선택지를 골라주세요.
          </MandarinText>
        </View>

        {/* 2. 모든 질문 표시 */}
        {questions.map((question) => (
          <View key={question.id} className="mb-10">
            {/* 질문 텍스트 */}
            <MandarinText className="text-[20px] w-full self-center text-center font-semibold px-4">
              {question.text}
            </MandarinText>

            {/* 선택 버튼 (LoveTypeButton 내부 mt-20 상쇄) */}
            <View style={{ marginTop: -60 }}>
              <LoveTypeButton
                selectedAnswer={answers[question.id]}
                currentQuestion={question}
                handleAnswerSelect={handleAnswerSelect}
              />
            </View>
          </View>
        ))}

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
