import SignUpPage from "@/components/auth/signuppage";
import Header from "@/components/ui/Header";
import { View } from "react-native";

export default function AuthSignUp() {
  return (
    <View className="flex-1 bg-white w-full">
      <Header title="회원가입" />
      <SignUpPage />
    </View>
  );
}
