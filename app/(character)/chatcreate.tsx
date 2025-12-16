import ChatCreatePage from "@/components/chat/chatcreatepage";
import Header from "@/components/ui/Header";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatCreate() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="만다린" className="mr-60" />
      <ChatCreatePage characterId={parseInt(characterId)} />
    </SafeAreaView>
  );
}
