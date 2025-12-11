import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function CreateReport({
  simulationId,
}: {
  simulationId: string;
}) {
  const handleReportCreate = () => {
    console.log(`${simulationId} 보고서 생성`);
  };

  return (
    <Pressable onPress={handleReportCreate}>
      <Ionicons name="document-text-outline" size={26} color="black" />
    </Pressable>
  );
}
