import ChatPage from "@/components/chat/chatpage";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharChat() {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();

  return (
    <SafeAreaView>
      <ChatPage simulationId={simulationId} />
    </SafeAreaView>
  );
}
