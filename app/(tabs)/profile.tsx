import ProfilePage from "@/components/profile/profilepage";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { Platform, StatusBar, View } from "react-native";

export default function ProfileTab() {
  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F6F5F3");
      StatusBar.setBarStyle("dark-content");

      NavigationBar.setBackgroundColorAsync("#FFFFFF");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  return (
    <View className="flex-1 bg-[#F6F5F3]">
      <ProfilePage />
    </View>
  );
}
