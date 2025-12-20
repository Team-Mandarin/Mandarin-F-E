// app/(character)/chat_load.tsx

import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import MandarinText from "@/components/ui/MandarinText";
import { SafeAreaView } from "react-native-safe-area-context";

const LOADING_TEXTS = [".", "..", "..."];

export default function ChatCreateLoad({
  setIsLoading,
  isLoading, // ✅ 추가
}: {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean; // ✅ 추가
}) {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // ✅ isLoading이 false가 되면 자동으로 이동
    if (!isLoading) {
      router.replace({
        pathname: "/charchat",
        params: { simulationId },
      });
      return;
    }

    // ✅ 텍스트 애니메이션은 계속 진행
    const timer = setTimeout(() => {
      // 마지막 인덱스에 도달하면 0으로 리셋, 아니면 다음 인덱스로
      setTextIndex((prevIndex) =>
        prevIndex < LOADING_TEXTS.length - 1 ? prevIndex + 1 : 0
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, [textIndex, simulationId, isLoading]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-6 ml-8 gap-2">
        <MandarinText className="text-5xl font-bold text-black">
          고민을
        </MandarinText>
        <MandarinText className="text-5xl font-bold text-black">
          해결해줄
        </MandarinText>
        <MandarinText className="text-5xl font-bold text-black"></MandarinText>
        <View className="flex-row">
          <MandarinText className="text-5xl font-bold text-[#FF9D00]">
            캐릭터
          </MandarinText>
          <MandarinText className="text-5xl font-bold text-black">
            를
          </MandarinText>
        </View>
        <MandarinText className="text-5xl font-bold text-black">
          불러오는 중{LOADING_TEXTS[textIndex]}
        </MandarinText>
      </View>
      <View className="items-center mt-20">
        <Image
          source={require("@/assets/images/mandarin_large.png")}
          resizeMode="contain"
          className="w-60"
        />
      </View>
    </SafeAreaView>
  );
}
