import { authService } from "@/services/authService";
import { chatService } from "@/services/chatService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

export default function CreateReport({
  simulationId,
  setIsCreatedReport,
}: {
  simulationId: number;
  setIsCreatedReport: (isCreatedReport: boolean) => void;
}) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const id = await authService.getId();
      setId(id);
    };
    getId();
  }, []);

  const handleReportCreate = async () => {
    console.log(`${simulationId} 보고서 생성`);
    setIsCreatedReport(true);
    const response = await chatService.createReport({
      simulationId: simulationId,
      id: Number(id),
    });

    console.log(response);

    setIsCreatedReport(false);
    router.replace({
      pathname: "/chatreport",
      params: {
        report: JSON.stringify(response),
      },
    });
  };

  return (
    <Pressable onPress={handleReportCreate}>
      <Ionicons name="document-text-outline" size={26} color="black" />
    </Pressable>
  );
}
