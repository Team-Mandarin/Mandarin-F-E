import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";

type LoveTypeInfo = (typeof loveTypeInfo)[number];

export default function NewLoveTypePage() {
  const [userName, setUserName] = useState("");
  const [typeInfo, setTypeInfo] = useState<LoveTypeInfo | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const id = Number(await authService.getId());
      if (!id) {
        return;
      }
      const userInfo = await userService.getUser(id);

      if (userInfo) {
        setUserName(userInfo.data.username);
        setTypeInfo(loveTypeInfo[userInfo.data.loveType]);
      }
    };

    getUserInfo();
  }, []);

  if (!typeInfo) {
    return (
      <View className="flex-1 items-center justify-center">
        <MandarinText>러브타입 정보를 찾을 수 없습니다.</MandarinText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 16 }}
      >
        <MandarinText className="text-[37px] font-bold">
          {userName}님은
        </MandarinText>
        <MandarinText className="text-[37px] font-bold mb-4">
          {typeInfo.name}입니다.
        </MandarinText>

        <View className="items-center mb-6">
          <Image
            source={typeInfo.image}
            style={{ height: 240, aspectRatio: 1 }}
            resizeMode="contain"
          />
        </View>

        <View className="mb-6">
          <MandarinText className="text-[26px] font-semibold mb-4">
            기본 성격
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.personality}
          </MandarinText>
        </View>

        <View className="mb-6">
          <MandarinText className="text-[26px] font-semibold mb-2">
            연애 스타일
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.style}
          </MandarinText>
        </View>

        <View className="mb-6">
          <MandarinText className="text-[26px] font-semibold mb-2">
            이상적인 연애 상대
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.ideal}
          </MandarinText>
        </View>

        <View className="mb-6">
          <MandarinText className="text-[26px] font-semibold mb-2">
            유형별 궁합
          </MandarinText>
          <MandarinText className="text-[20px] font-semibold mb-2">
            💛 BEST TYPE
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.best}
          </MandarinText>
        </View>

        <View className="mb-6">
          <MandarinText className="text-[20px] font-semibold mb-2">
            💚 GOOD TYPE
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.good}
          </MandarinText>
        </View>

        <View className="mb-6">
          <MandarinText className="text-[20px] font-semibold mb-2">
            🔥 CHALLENGE TYPE
          </MandarinText>
          <MandarinText className="text-[17px] leading-6">
            {typeInfo.chanllenge}
          </MandarinText>
        </View>
      </ScrollView>

      <View className="px-6 py-2">
        <Button
          label="계속하기"
          onPress={() => {
            router.replace("/(tabs)/profile");
          }}
        />
      </View>
    </View>
  );
}
