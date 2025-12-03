import CheckPWPage from "@/components/profile/checkpwpage";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckPW() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <Header />
            <MandarinText className="text-2xl font-medium text-center mt-32">
              사용하고 있는 패스워드를{"\n"}
              입력해주세요
            </MandarinText>
            <CheckPWPage />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
