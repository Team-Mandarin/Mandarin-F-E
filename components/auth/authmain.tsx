import MandarinText from "@/components/ui/MandarinText";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthMain() {
  return (
    <SafeAreaView>
      <View>
        <MandarinText>가입</MandarinText>
      </View>
    </SafeAreaView>
  );
}
