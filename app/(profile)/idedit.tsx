import IdEditPage from "@/components/profile/ideditpage";
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

export default function IdEdit() {
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white w-full">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <Header onBack={handleBack} />
            <MandarinText className="text-4xl font-bold text-black ml-8 mt-2">
              아이디 변경
            </MandarinText>
            <IdEditPage />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ConfirmDialog
        visible={showModal}
        title="정말 나가시나요?"
        message="지금 나가시면 아이디 변경을 처음부터 다시 시작해야해요."
        onConfirm={confirmExit}
        onCancel={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}
