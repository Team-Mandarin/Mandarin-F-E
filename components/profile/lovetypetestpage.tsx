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

export default function LoveTypeTestPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const goToNextQuestion = () => {
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

      const loveType = `${type1}${type2}${type3}${type4}`;

      // 백엔드에 러브타입 저장

      router.replace("/newlovetype");
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
    if (currentQuestionIndex === 0) {
      router.replace("/profile");
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
