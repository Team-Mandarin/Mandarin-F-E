import PwEditPage from "@/components/profile/pweditpage";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PwEdit() {
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <Header onBack={handleBack} />
            <MandarinText className="text-[32px] font-bold ml-8 mt-4">
              패스워드 변경
            </MandarinText>
            <PwEditPage />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ConfirmDialog
        visible={showModal}
        title="정말 나가시나요?"
        message="지금 나가시면 비밀번호 변경을 처음부터 다시 시작해야해요."
        onConfirm={confirmExit}
        onCancel={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}
