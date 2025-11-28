import { router } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
import Button from "../ui/Button";
import MandarinText from "../ui/MandarinText";

export default function MyLoveTypePage() {
  // 저장된 사용자 정보 가져온 뒤 출력 진행
  const loveType = "1000"; // TODO: 백엔드에서 가져온 러브타입으로 교체
  const userName = "만다린"; // TODO: 백엔드에서 가져온 사용자 이름으로 교체

  const typeInfo = loveTypeInfo[loveType];

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
            router.replace("/chat");
          }}
        />
      </View>
    </View>
  );
}
