import { Image, ScrollView, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
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
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ flexGrow: 1, padding: 24 }}
    >
      <MandarinText className="text-2xl font-bold text-center mb-4">
        {userName}님은 {typeInfo.name}입니다.
      </MandarinText>

      <View className="items-center mb-6">
        <Image
          source={typeInfo.image}
          style={{ height: 192, aspectRatio: 1 }}
          resizeMode="contain"
        />
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          기본 성격
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.personality}
        </MandarinText>
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          연애 스타일
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.style}
        </MandarinText>
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          이상적인 연애 상대
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.ideal}
        </MandarinText>
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          💛 최고의 궁합
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.best}
        </MandarinText>
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          💚 좋은 궁합
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.good}
        </MandarinText>
      </View>

      <View className="mb-6">
        <MandarinText className="text-lg font-bold mb-2">
          🔥 도전적인 궁합
        </MandarinText>
        <MandarinText className="text-base leading-6">
          {typeInfo.chanllenge}
        </MandarinText>
      </View>
    </ScrollView>
  );
}
