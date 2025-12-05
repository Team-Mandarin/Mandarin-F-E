import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { authService } from "@/services/authService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";

export default function ProfileLoveTypePage() {
  const [userName, setUserName] = useState("");
  const [loveType, setLoveType] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // userId 가져오기
        const userId = await authService.getUserId();
        if (userId) {
          setUserName(userId);
        }

        // loveType 가져오기
        const storedLoveType = await authService.getLoveType();
        if (storedLoveType !== null && storedLoveType >= 0 && storedLoveType <= 15) {
          setLoveType(storedLoveType);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const typeInfo = loveTypeInfo[loveType];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <MandarinText>로딩 중...</MandarinText>
      </View>
    );
  }

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
          label="확인"
          onPress={() => {
            router.replace("/(tabs)/profile");
          }}
        />
      </View>
    </View>
  );
}
