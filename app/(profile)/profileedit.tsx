import DeleteUser from "@/components/profile/deleteuser";
import ProfileEditPage from "@/components/profile/profileeditpage";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
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

      <DeleteUser showModal={showModal} setShowModal={setShowModal} />
    </SafeAreaView>
  );
}
