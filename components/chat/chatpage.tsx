import { View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function ChatPage({ simulationId }: { simulationId?: string }) {
  return (
    <View>
      <MandarinText>ID: [{simulationId}] chat</MandarinText>
    </View>
  );
}
