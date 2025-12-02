import AuthMain from "@/components/auth/authmain";
import Header from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthHome() {
  return (
    <SafeAreaView className="bg-white">
      <Header />
      <AuthMain />
    </SafeAreaView>
  );
}
