import PencilIcon from "@/assets/svg/pencil.svg";
import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import ProfileButton from "../ui/ProfileButton";
import LoveTypeCard from "./lovetypecard";

export default function ProfilePage() {
  // 정보들은 추후 api를 통해 가져와서 입력
  const userName = "만다린";
  const loveType = 1000;

  const typeInfo = loveTypeInfo[loveType];

  return (
    <View className="flex-1 mt-0">
      <View className="flex-row items-center">
        <MandarinText className="text-[25px] font-bold mr-2 ml-4">
          {userName}님
        </MandarinText>
        <Pressable onPress={() => router.push("/nameedit")}>
          <PencilIcon />
        </Pressable>
      </View>
      <LoveTypeCard image={typeInfo.image} />
      <MandarinText className="text-[26px] font-semibold text-center mt-4">
        {userName}님은 {typeInfo.name}입니다.
      </MandarinText>
      <View className="flex-1 items-center w-full mt-8 gap-4">
        <ProfileButton
          label="회원 정보 관리"
          onPress={() => router.push("/checkpw")}
        />
        <ProfileButton
          label="나의 연애 타입 테스트 다시하기"
          onPress={() => router.push("/newlovetypetest")}
        />
        <ProfileButton
          label="자료 출처"
          onPress={() => router.push("/datasource")}
        />
        <ProfileButton
          label="개인정보 처리방침"
          onPress={() => router.push("/privacypolicy")}
        />
      </View>
    </View>
  );
}
