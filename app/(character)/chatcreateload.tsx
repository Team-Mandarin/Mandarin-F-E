// app/(character)/chat_load.tsx

import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, View } from "react-native";

import MandarinText from "@/components/ui/MandarinText";

const { width, height } = Dimensions.get("window");

const LOADING_TEXTS = [
  "고민을 해결해 줄 만다린을 찾는 중.",
  "고민을 해결해 줄 만다린을 찾는 중..",
  "고민을 해결해 줄 만다린을 찾는 중...",
];

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
      if (textIndex < LOADING_TEXTS.length - 1) {
        setTextIndex(textIndex + 1);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [textIndex, simulationId, isLoading]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("@/assets/images/chatbot_loading1.png")}
        style={{ width, height }}
        resizeMode="cover"
      >
        {/* 텍스트 오버레이 */}
        <View className="flex-1 justify-start items-center pt-[50%]">
          <MandarinText className="text-[30px] font-bold text-black">
            {LOADING_TEXTS[textIndex]}
          </MandarinText>
        </View>
      </ImageBackground>
    </View>
  );
}
