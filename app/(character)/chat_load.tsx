// app/(character)/chat_load.tsx

import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { SafeAreaView } from "react-native-safe-area-context";

const LOADING_TEXTS = [".", "..", "..."];

const INTERVAL_MS = 1500; // 1.5초

export default function ChatLoad() {
  const { characterId } = useLocalSearchParams<{ characterId: string }>();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textIndex < LOADING_TEXTS.length - 1) {
        // 다음 문구로 변경
        setTextIndex(textIndex + 1);
      } else {
        // 마지막 문구 후 chatbot으로 이동
        router.replace({
          pathname: "/chatlist",
          params: { characterId },
        });
      }
    }, INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [textIndex, characterId]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <View className="mt-10 ml-8 gap-2">
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
