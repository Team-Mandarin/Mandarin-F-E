import {
  CATEGORY_OPTIONS,
  CategoryType,
  PURPOSE_LABELS,
  PurposeType,
} from "@/constants/simulationType";
import { reportService } from "@/services/reportService";
import { Report } from "@/types/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

type CustomSimulation = {
  simulationId: number;
  simulationName: string;
  purpose: string;
  category: string;
  time: string;
};

export default function ReportCard({
  simulationId,
  simulationName,
  purpose,
  category,
  time,
}: CustomSimulation) {
  const [report, setReport] = useState<Report | null>(null);
  useEffect(() => {
    const getSimulation = async () => {
      const response = await reportService.getChatReports();

      const matchedReport = response.data?.find(
        (report) => report.simulationId === simulationId
      );

      setReport(matchedReport ?? null);
    };
    getSimulation();
  }, [simulationId]);

  const purposeLabel = PURPOSE_LABELS[purpose as PurposeType] || purpose;

  // category를 한글로 변환
  const categoryLabel =
    CATEGORY_OPTIONS[purpose as PurposeType]?.find(
      (opt) => opt.value === (category as CategoryType)
    )?.label || category;

  const parsedReportContent = report?.reportContent
    ? JSON.parse(report.reportContent)
    : null;

  return (
    <View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/chatreport",
            params: {
              report: JSON.stringify({ report: parsedReportContent }),
            },
          })
        }
      >
        <View className="flex-row w-96 justify-between items-center p-6 bg-[#FCFCFC] rounded-2xl">
          <View>
            <MandarinText>{simulationName}</MandarinText>
            <View className="flex-row">
              <MandarinText className="text-sm text-[#8E8E8E]">
                {purposeLabel} | {categoryLabel} | {time.slice(0, 10)}
              </MandarinText>
            </View>
          </View>
          <MandarinText className="text-lg font-bold">
            {report?.scoreAvg}
          </MandarinText>
        </View>
      </Pressable>
    </View>
  );
}
