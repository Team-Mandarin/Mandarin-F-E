import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LovetypeDetail() {
  const { loveTypeId } = useLocalSearchParams<{ loveTypeId: string }>();
  const typeInfo = loveTypeInfo[Number(loveTypeId)];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title={typeInfo.name} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 16 }}
      >
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
    </SafeAreaView>
  );
}
