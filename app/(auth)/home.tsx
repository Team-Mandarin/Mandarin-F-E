import AuthMain from "@/components/auth/authmain";
import Header from "@/components/ui/Header";
import { View } from "react-native";

export default function AuthHome() {
  return (
    <View>
      <Header />
      <AuthMain />
    </View>
  );
}
