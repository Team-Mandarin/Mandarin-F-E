import { CharacterReports } from "@/types/api";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import MandarinText from "../ui/MandarinText";
import TriggerPointCard from "./triggerpointcard";

export default function TriggerPointPage({
  characterReport,
}: {
  characterReport: CharacterReports;
}) {
  return (
    <ScrollView className="flex-1 ">
      {characterReport.data?.map((report) => (
        <TriggerPointCard
          key={report.reportCharacterId}
          keyword={report.conflictName}
          percentage={report.dangerLevel}
          className="bg-[#E8EFFC]"
          onPress={() =>
            router.push({
              pathname: "/triggerdetail",
              params: {
                report: JSON.stringify(report),
              },
            })
          }
        />
      ))}
      <MandarinText className="text-center text-xs font-light text-[#8E8E8E] mt-6 mb-4">
        해당 정보는 참고용이며 무조건적인 신뢰는 지양해주세요.
      </MandarinText>
    </ScrollView>
  );
}
