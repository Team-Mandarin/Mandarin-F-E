import { View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface QuestionType {
  id: number;
  text: string;
}

interface LoveTypeQuestionProps {
  currentQuestion: QuestionType;
}

export default function LoveTypeQuestion({
  currentQuestion,
}: LoveTypeQuestionProps) {
  const progressPercent = (currentQuestion.id / 12) * 100;
  return (
    <View className="h-[200px]">
      <MandarinText className="text-[20px] text-center mt-4">
        {currentQuestion.id}/12
      </MandarinText>
      <View
        style={{
          width: "90%",
          height: 15,
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: 8,
          marginBottom: 20,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            height: "100%",
            backgroundColor: "#89CB26",
            borderRadius: 20,
            width: `${progressPercent}%`,
          }}
        />
      </View>
      <MandarinText className="text-[25px] w-full self-center text-center font-semibold mt-4 mb-4">
        {currentQuestion.text}
      </MandarinText>
    </View>
  );
}
