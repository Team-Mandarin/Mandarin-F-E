import Character from "@/components/report/character";
import Me from "@/components/report/me";
import MandarinText from "@/components/ui/MandarinText";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, StatusBar, View } from "react-native";

export default function ReportTab() {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#FFFFFF");
      StatusBar.setBarStyle("dark-content");

      NavigationBar.setBackgroundColorAsync("#FFFFFF");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  const [tap, setTap] = useState(0);

  return (
    <View className="flex-1 bg-[#f6f5f3]">
      <MandarinText className="text-4xl font-bold text-black ml-4 mt-4">
        리포트
      </MandarinText>
      <View className="flex-row gap-2 w-full justify-center mt-4">
        <Pressable
          className={`w-52 pb-1 ${
            tap === 0
              ? "border-b-2 border-[#FF9D00]"
              : "border-b-2 border-[#8e8e8e]"
          }`}
          onPress={() => setTap(0)}
        >
          <MandarinText
            className={`text-2xl font-bold text-center ${
              tap === 0 ? "text-[#FF9D00]" : "text-[#8e8e8e]"
            }`}
          >
            캐릭터
          </MandarinText>
        </Pressable>
        <Pressable
          className={`w-44 pb-1 ${
            tap === 1
              ? "border-b-2 border-[#FF9D00]"
              : "border-b-2 border-[#8e8e8e]"
          }`}
          onPress={() => setTap(1)}
        >
          <MandarinText
            className={`text-2xl font-bold text-center ${
              tap === 1 ? "text-[#FF9D00]" : "text-[#8e8e8e]"
            }`}
          >
            나
          </MandarinText>
        </Pressable>
      </View>
      <ScrollView className="flex-1 bg-[#f6f5f3]">
        {tap === 0 && <Character />}
        {tap === 1 && <Me />}
      </ScrollView>
    </View>
  );
}
