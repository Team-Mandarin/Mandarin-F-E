import ProfileEditPage from "@/components/profile/profileeditpage";
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

      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 mx-8 w-[280px]">
            <MandarinText className="text-lg font-bold text-center mb-2">
              정말 탈퇴하시겠어요?
            </MandarinText>
            <MandarinText className="text-sm text-gray-500 text-center mb-6">
              탈퇴하시면 모든 데이터가 삭제되며{"\n"}복구할 수 없습니다.
            </MandarinText>
            <View className="flex-row gap-3">
              <Pressable
                onPress={handleWithdraw}
                className="flex-1 py-3 rounded-xl bg-[#FF8A8A]"
              >
                <MandarinText className="text-center text-white">
                  탈퇴하기
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
