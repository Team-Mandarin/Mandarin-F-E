import { useState } from "react";
import { View } from "react-native";
import { questions } from "../../constants/lovetypeData";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";
import LoveTypeButton from "./lovetypebutton";
import LoveTypeQuestion from "./lovetypequestion";

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
      console.log("설문 완료!");
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
