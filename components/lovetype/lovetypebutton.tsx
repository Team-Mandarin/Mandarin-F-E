import { Pressable, View } from "react-native";
import Line from "../../assets/svg/Line.svg";
import Icon1 from "../../assets/svg/Subtract1.svg";
import FillIcon1 from "../../assets/svg/Subtract1Fill.svg";
import Icon2 from "../../assets/svg/Subtract2.svg";
import FillIcon2 from "../../assets/svg/Subtract2Fill.svg";
import Icon3 from "../../assets/svg/Subtract3.svg";
import FillIcon3 from "../../assets/svg/Subtract3Fill.svg";
import Icon4 from "../../assets/svg/Subtract4.svg";
import FillIcon4 from "../../assets/svg/Subtract4Fill.svg";
import MandarinText from "../ui/MandarinText";

interface QuestionType {
  id: number;
}

interface LoveTypeButtonProps {
  selectedAnswer: number | null;
  currentQuestion: QuestionType;
  handleAnswerSelect: (questionId: number, selectedAnswer: number) => void;
}

export default function LoveTypeButton({
  selectedAnswer,
  currentQuestion,
  handleAnswerSelect,
}: LoveTypeButtonProps) {
  return (
    <View className="">
      <View className="flex-row justify-around w-full h-[197px] self-center mt-20 px-4 items-end">
        <Pressable onPress={() => handleAnswerSelect(currentQuestion.id, 0)}>
          {selectedAnswer === 0 ? <FillIcon1 /> : <Icon1 />}
        </Pressable>
        <Pressable onPress={() => handleAnswerSelect(currentQuestion.id, 1)}>
          {selectedAnswer === 1 ? <FillIcon2 /> : <Icon2 />}
        </Pressable>
        <Pressable onPress={() => handleAnswerSelect(currentQuestion.id, 2)}>
          {selectedAnswer === 2 ? <FillIcon3 /> : <Icon3 />}
        </Pressable>
        <Pressable onPress={() => handleAnswerSelect(currentQuestion.id, 3)}>
          {selectedAnswer === 3 ? <FillIcon4 /> : <Icon4 />}
        </Pressable>
      </View>
      <View className="flex-row justify-around w-full self-center mt-4 px-4 items-center">
        <MandarinText>아니다</MandarinText>
        <Line />
        <MandarinText>그렇다</MandarinText>
      </View>
    </View>
  );
}
