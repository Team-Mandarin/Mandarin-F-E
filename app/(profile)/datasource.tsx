import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { Dimensions, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function DataSource() {
  const imageWidth = screenWidth - 64; // 좌우 패딩 32씩
  const imageHeight = imageWidth * (354 / 789);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <MandarinText className="text-4xl font-bold ml-8 mt-2">
        자료 출처
      </MandarinText>
      <MandarinText className="text-sm ml-8 mt-2">
        만다린 서비스를 만들 때 참고했던 자료들의 출처를 명시해요
      </MandarinText>
      <MandarinText className="text-2xl font-semibold ml-8 mt-8">
        연애 타입
      </MandarinText>
      <View className="items-center w-96 aspect-[789/354] ml-8">
        <Image
          source={require("@/assets/images/lovetype.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <MandarinText className="text-sm ml-8 mt-2">
        만다린의 연애 타입은 일본에서 유행하는 온라인 연애 유형 테스트로,{"\n"}
        사용자가 자신의 연애 스타일과 연애 패턴을 발견하도록 돕기 위해{"\n"}
        설계되었습니다.{"\n"}
        {"\n"}
        성격 유형 이론(MBTI)에서 영감을 받아 연애 상황에 맞게 재구성된{
          "\n"
        }{" "}
        테스트입니다.{"\n"}
        {"\n"}
        캐릭터는 네 가지 이분법적 선호도(E/I, S/N, T/F, J/P)를 조합하여{"\n"}
        16가지 고유한 연애 유형으로 분류{"\n"}
        {"\n"}
        아래는 연애 유형 테스트 링크이며 출처를 명확히 밝히는 바입니다.{"\n"}
        https://lovetype.org/ko/test
      </MandarinText>
    </SafeAreaView>
  );
}
