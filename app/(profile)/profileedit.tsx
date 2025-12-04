import ProfileEditPage from "@/components/profile/profileeditpage";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleWithdraw = async () => {
    setIsLoading(true);

    try {
      // 저장된 userId 가져오기
      const userId = await authService.getUserId();

      if (userId) {
        // 회원 탈퇴 API 호출
        await userService.deleteUser(userId);
      }

      // 로컬 토큰 삭제 (로그아웃)
      await authService.logout();

      setShowModal(false);
      // 탈퇴 성공 후 홈 화면으로 이동
      router.replace("/home");
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
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
