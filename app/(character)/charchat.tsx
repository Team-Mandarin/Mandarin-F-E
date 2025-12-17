import ChatPage from "@/components/chat/chatpage";
import CreateReport from "@/components/chat/createreport";
import Header from "@/components/ui/Header";
import KeyboardAwareView from "@/components/ui/KeyboardAwareView";
import MandarinText from "@/components/ui/MandarinText";
import { chatService } from "@/services/chatService";
import { Simulation } from "@/types/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function CharChat() {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimulation = async () => {
      const response = await chatService.getSimulation(Number(simulationId));
      setSimulation(response.data);
      setIsLoading(false);
      setIsFinished(response.data.isFinished);
    };
    fetchSimulation();
  }, [simulationId]);

  return isLoading ? (
    <MandarinText>Loading...</MandarinText>
  ) : (
    <KeyboardAwareView className="flex-1 bg-white">
      <Header
        title={`${simulation?.simulationName}`}
        className="w-full text-left"
      >
        {!isFinished && (
          <CreateReport simulationId={simulation?.simulationId || 0} />
        )}
      </Header>
      <ChatPage simulationId={String(simulation?.simulationId)} />
    </KeyboardAwareView>
  );
}
