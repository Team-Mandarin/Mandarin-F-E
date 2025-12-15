import LoginPage from "@/components/auth/loginpage";
import Header from "@/components/ui/Header";
import { authService } from "@/services/authService";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLogin() {
  useEffect(() => {
    const getUserId = async () => {
      const id = await authService.getId();
      console.log(id);
    };
    getUserId();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white w-full">
      <Header title="로그인" />
      <LoginPage />
    </SafeAreaView>
  );
}
