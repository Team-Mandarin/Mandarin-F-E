import IdEditPage from "@/components/profile/ideditpage";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
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

      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 mx-8 w-[280px]">
            <MandarinText className="text-lg font-bold text-center mb-2">
              정말 나가시나요?
            </MandarinText>
            <MandarinText className="text-sm text-gray-500 text-center">
              지금 나가시면 아이디 변경을 처음부터
            </MandarinText>
            <MandarinText className="text-sm text-gray-500 text-center mb-6">
              다시 시작해야해요.
            </MandarinText>
            <View className="flex-row gap-3">
              <Pressable
                onPress={confirmExit}
                className="flex-1 py-3 rounded-xl bg-[#FF9D00]"
              >
                <MandarinText className="text-center text-white">
                  나가기
                </MandarinText>
              </Pressable>
              <Pressable
                onPress={() => setShowModal(false)}
                className="flex-1 py-3 rounded-xl bg-gray-200"
              >
                <MandarinText className="text-center">취소</MandarinText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
