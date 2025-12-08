import Juice0 from "@/assets/svg/juice/0.svg";
import Juice25 from "@/assets/svg/juice/25.svg";
import Juice50 from "@/assets/svg/juice/50.svg";
import Juice75 from "@/assets/svg/juice/75.svg";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import CharacterCard from "./charactercard";
import ReportCard from "./reportcard";

const JUICE_HEIGHT = 120;

export default function JuiceDetailPage() {
  const score = 72;
  const [juiceName, setJuiceName] = useState("");
  const [juiceImage, setJuiceImage] = useState<React.ReactNode>(
    <Juice75 height={JUICE_HEIGHT} />
  );

  useEffect(() => {
    if (score >= 75) {
      setJuiceName("감귤 착즙 주스");
      setJuiceImage(<Juice75 height={JUICE_HEIGHT} />);
    } else if (score >= 50) {
      setJuiceName("감귤맛 주스");
      setJuiceImage(<Juice50 height={JUICE_HEIGHT} />);
    } else if (score >= 25) {
      setJuiceName("감귤향 주스");
      setJuiceImage(<Juice25 height={JUICE_HEIGHT} />);
    } else {
      setJuiceName("감귤 껍질 주스");
      setJuiceImage(<Juice0 height={JUICE_HEIGHT} />);
    }
  }, [score]);

  const reportCards = [
    {
      title: "채팅방1",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 100, 50],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
    {
      title: "채팅방2",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 72, 72],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
    {
      title: "채팅방3",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 72, 72],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
    {
      title: "채팅방4",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 72, 72],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
    {
      title: "채팅방5",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 72, 72],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
    {
      title: "채팅방6",
      purpose: "후회",
      category: "감정, 다툼",
      date: "2025-01-01",
      score: 72,
      label_key: [1, 2, 3],
      label_score: [72, 72, 72],
      report_content: {
        conversation_log:
          "이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        caution: {
          message: "주의하세요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
        suggestion: {
          message: "이건 어때요",
          content:
            "이런 말을 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고이런 대화를 했어요 어쩌고 저쩌고",
        },
      },
    },
  ];

  return (
    <View className="flex-1 bg-white items-center">
      <CharacterCard />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center mt-12">{juiceImage}</View>
        <MandarinText className="text-lg font-medium text-center mt-4">
          {juiceName}
        </MandarinText>
        <MandarinText className="text-[#8E8E8E] text-sm font-medium text-center mt-4">
          건강한 채팅이 쌓일수록 감귤 주스의 농도가 올라가요.
        </MandarinText>
        {reportCards.map((reportCard) => (
          <ReportCard
            key={reportCard.title}
            title={reportCard.title}
            purpose={reportCard.purpose}
            category={reportCard.category}
            date={reportCard.date}
            score={reportCard.score}
            label_key={reportCard.label_key}
            label_score={reportCard.label_score}
            report_content={reportCard.report_content}
          />
        ))}
      </ScrollView>
    </View>
  );
}
