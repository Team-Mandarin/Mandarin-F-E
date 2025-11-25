import LoginPage from "@/components/auth/loginpage";
import Header from "@/components/ui/Header";
import { View } from "react-native";

export default function AuthLogin() {
  return (
    <View className="flex-1 bg-white w-full">
      <Header title="로그인" />
      <LoginPage />
    </View>
  );
}
