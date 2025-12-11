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

const INTERVAL_MS = 1500; // 1.5초

export default function ChatCreateLoad() {
  const { simulationId } = useLocalSearchParams<{ simulationId: string }>();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textIndex < LOADING_TEXTS.length - 1) {
        // 다음 문구로 변경
        setTextIndex(textIndex + 1);
      } else {
        // 마지막 문구 후 chatbot으로 이동
        router.replace({
          pathname: "/charchat",
          params: { simulationId },
        });
      }
    }, INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [textIndex, simulationId]);

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
