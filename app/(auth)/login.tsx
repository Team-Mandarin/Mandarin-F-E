import LoginPage from "@/components/auth/loginpage";
import Header from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLogin() {
  return (
    <SafeAreaView className="flex-1 bg-white w-full">
      <Header title="로그인" />
      <LoginPage />
    </SafeAreaView>
  );
}
