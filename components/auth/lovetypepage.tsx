import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { questions } from "../../constants/lovetypeData";
import LoveTypeButton from "../lovetype/lovetypebutton";
import LoveTypeQuestion from "../lovetype/lovetypequestion";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";

const initialAnswers = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: null,
};

export default function LoveTypePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const [answers, setAnswers] = useState(initialAnswers);
  const selectedAnswer =
    answers[currentQuestion.id as keyof typeof initialAnswers];

  const handleAnswerSelect = (questionId: number, selectedAnswer: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const goToNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      const allAnswered = Object.values(answers).every(
        (answer) => answer !== null
      );
      if (!allAnswered) {
        Toast.show({
          type: "login",
          text1: "모든 질문에 답변해주세요",
          visibilityTime: 4000,
        });
        return;
      }

      const type1 = answers[6]! + answers[11]! - answers[1]! >= 2 ? 1 : 0; // 1: Lead, 0: Follow
      const type2 = answers[5]! + answers[12]! - answers[8]! >= 2 ? 1 : 0; // 1: Accept, 0: Cuddly
      const type3 = answers[2]! + answers[9]! - answers[7]! >= 2 ? 1 : 0; // 1: Realistic, 0: Passionate
      const type4 = answers[3]! + answers[10]! - answers[4]! >= 2 ? 1 : 0; // 1: Optimistic, 0: Earnest

      // 이진수를 0-15 정수로 변환
      const loveType = type1 * 8 + type2 * 4 + type3 * 2 + type4;

      // 백엔드에 러브타입 저장
      setIsSubmitting(true);
      try {
        const userId = await authService.getUserId();
        if (userId) {
          await userService.updateLoveType(userId, loveType);
        }
        router.replace("/mylovetype");
      } catch (error) {
        console.error("러브타입 저장 실패:", error);
        // 실패해도 결과 화면으로 이동 (오프라인 지원)
        router.replace("/mylovetype");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <View className="flex-1 bg-white w-full justify-between">
      <LoveTypeQuestion currentQuestion={currentQuestion} />
      <LoveTypeButton
        selectedAnswer={selectedAnswer}
        currentQuestion={currentQuestion}
        handleAnswerSelect={handleAnswerSelect}
      />
      <View className="w-[325px] self-center">
        <Button
          textClassName="text-white"
          className="mb-4"
          label="계속하기"
          onPress={goToNextQuestion}
        />
        <MandarinText
          className="text-lg font-bold text-center"
          onPress={goToPrevQuestion}
        >
          이전으로
        </MandarinText>
      </View>
    </View>
  );
}
