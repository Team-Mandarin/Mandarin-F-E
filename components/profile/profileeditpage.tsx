import { router } from "expo-router";
import { View } from "react-native";
import MandarinText from "../ui/MandarinText";
import ProfileButton from "../ui/ProfileButton";

export default function ProfileEditPage({
  handleModal,
}: {
  handleModal: () => void;
}) {
  const userNames = "만다린";

  return (
    <View className="flex-1">
      <MandarinText className="text-[12px] ml-8 mt-2 mb-16">
        {userNames}님의 회원 정보를 관리해요
      </MandarinText>
      <View className="flex-1 gap-4 items-center">
        <ProfileButton
          label="패스워드 변경"
          onPress={() => router.push("/pwedit")}
          className="bg-[#f2f2f2]"
        />
        <ProfileButton
          label="회원 탈퇴"
          onPress={handleModal}
          className="bg-[#FF8A8A]"
          textClassName="text-white"
        />
      </View>
    </View>
  );
}
