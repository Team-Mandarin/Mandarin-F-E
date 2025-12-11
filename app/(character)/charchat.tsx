import ChatPage from "@/components/chat/chatpage";
import CreateReport from "@/components/chat/createreport";
import Header from "@/components/ui/Header";
import KeyboardAwareView from "@/components/ui/KeyboardAwareView";
import { useLocalSearchParams } from "expo-router";

export default function CharChat() {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();

  return (
    <KeyboardAwareView className="flex-1 bg-white">
      <Header title={`${simulationId} 채팅`} className="mr-60">
        <CreateReport simulationId={simulationId} />
      </Header>
      <ChatPage simulationId={simulationId} />
    </KeyboardAwareView>
  );
}
