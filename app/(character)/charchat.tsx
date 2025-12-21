import ChatPage from "@/components/chat/chatpage";
import CreateReport from "@/components/chat/createreport";
import Header from "@/components/ui/Header";
import KeyboardAwareView from "@/components/ui/KeyboardAwareView";
import MandarinText from "@/components/ui/MandarinText";
import { chatService } from "@/services/chatService";
import { Simulation } from "@/types/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportCreateLoad from "./reportcreateload";

export default function CharChat() {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatedReport, setIsCreatedReport] = useState(false);

  useEffect(() => {
    const fetchSimulation = async () => {
      const response = await chatService.getSimulation(Number(simulationId));
      setSimulation(response.data);
      setIsLoading(false);
      setIsFinished(response.data.isFinished);
    };

    fetchSimulation();
  }, [simulationId]);

  return isCreatedReport ? (
    <SafeAreaView className="flex-1 bg-white">
      <ReportCreateLoad />
    </SafeAreaView>
  ) : isLoading ? (
    <SafeAreaView className="flex-1 bg-white">
      <MandarinText>Loading...</MandarinText>
    </SafeAreaView>
  ) : (
    <KeyboardAwareView className="flex-1 bg-white">
      <Header
        title={`${simulation?.simulationName}`}
        className="w-full text-left"
      >
        {!isFinished && (
          <CreateReport
            simulationId={simulation?.simulationId || 0}
            setIsCreatedReport={setIsCreatedReport}
          />
        )}
      </Header>
      <ChatPage simulationId={String(simulation?.simulationId)} />
    </KeyboardAwareView>
  );
}
