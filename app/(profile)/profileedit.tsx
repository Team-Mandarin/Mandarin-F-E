import ProfileEditPage from "@/components/profile/profileeditpage";
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

export default function ProfileEdit() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleWithdraw = async () => {
    // TODO: 회원 탈퇴 API 호출
    // try {
    //   await api.withdraw();
    //   router.replace("/login");
    // } catch (error) {
    //   console.error(error);
    // }

    setShowModal(false);
    // 탈퇴 성공 후 로그인 화면으로 이동
    router.replace("/home");
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            <Header />
            <MandarinText className="text-[32px] font-bold ml-8 mt-4">
              회원 정보 관리
            </MandarinText>
            <ProfileEditPage handleModal={handleModal} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ConfirmDialog
        visible={showModal}
        title="정말 탈퇴하시나요?"
        message="탈퇴하면 기존에 있던 모든 정보가 사라져요."
        confirmText="탈퇴하기"
        onConfirm={handleWithdraw}
        onCancel={() => setShowModal(false)}
        className="bg-[#FF8A8A]"
      />
    </SafeAreaView>
  );
}
