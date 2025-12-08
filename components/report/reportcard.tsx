import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

interface ReportCardProps {
  title: string;
  purpose: string;
  category: string;
  date: string;
  score: number;
  label_key: number[];
  label_score: number[];
  report_content: {
    conversation_log: string;
    caution: {
      message: string;
      content: string;
    };
    suggestion: {
      message: string;
      content: string;
    };
  };
}

export default function ReportCard({
  title,
  purpose,
  category,
  date,
  score,
  label_key,
  label_score,
  report_content,
}: ReportCardProps) {
  return (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/chatreport",
            params: {
              score,
              label_key: JSON.stringify(label_key),
              label_score: JSON.stringify(label_score),
              report_content: JSON.stringify(report_content),
            },
          })
        }
      >
        <View className="flex-row w-96 justify-between items-center p-6 bg-[#FCFCFC] rounded-2xl">
          <View>
            <MandarinText>{title}</MandarinText>
            <View className="flex-row">
              <MandarinText>
                {purpose} | {category} | {date}
              </MandarinText>
            </View>
          </View>
          <MandarinText>{score}</MandarinText>
        </View>
      </Pressable>
    </View>
  );
}
