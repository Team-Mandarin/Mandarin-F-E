import PencilIcon from "@/assets/svg/pencil.svg";
import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import ProfileButton from "../ui/ProfileButton";
import LoveTypeCard from "./lovetypecard";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [loveType, setLoveType] = useState<number>(0);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      // id 가져오기
      const id = Number(await authService.getId());

      const response = await userService.getUser(id);
      if (response.success) {
        setUserName(response.data.username);
        setLoveType(response.data.loveType);
      }
    };
    fetchUserInfo();
  }, []);

  const typeInfo = loveTypeInfo[loveType];

  return (
    <View className="flex-1 mt-2">
      <View className="flex-row items-center">
        <MandarinText className="text-[25px] font-bold mr-2 ml-4">
          {userName}님
        </MandarinText>
        <Pressable onPress={() => router.push("/nameedit")}>
          <PencilIcon />
        </Pressable>
      </View>
      <ScrollView>
        <LoveTypeCard image={typeInfo.image} />
        <MandarinText className="text-[26px] font-semibold text-center mt-4">
          {userName}님은 {typeInfo.name}입니다.
        </MandarinText>
        <View className="flex-1 items-center w-full mt-8 gap-4 mb-4">
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
          <ProfileButton
            label="로그아웃"
            onPress={() => authService.logout()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
