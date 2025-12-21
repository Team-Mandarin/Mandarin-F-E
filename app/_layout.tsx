import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../components/ui/ToastConfig";
import { CharacterCreateProvider } from "../contexts/CharacterCreateContext";
import { CharIdProvider } from "../contexts/CharIdContext";
import { MissionProvider } from "../contexts/MissionContext";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [time, setTime] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#FFFFFF");
      StatusBar.setBarStyle("dark-content");

      NavigationBar.setBackgroundColorAsync("#FFFFFF");
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [loaded, error] = useFonts({
    "Default-Font-Bold": require("../assets/fonts/SpoqaHanSansNeo-Bold.otf"),
    "Default-Font-Light": require("../assets/fonts/SpoqaHanSansNeo-Light.otf"),
    "Default-Font-Medium": require("../assets/fonts/SpoqaHanSansNeo-Medium.otf"),
    "Default-Font": require("../assets/fonts/SpoqaHanSansNeo-Regular.otf"),
    "Default-Font-Thin": require("../assets/fonts/SpoqaHanSansNeo-Thin.otf"),
  });

  useEffect(() => {
    if ((loaded || error) && time) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, time]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <CharacterCreateProvider>
          <CharIdProvider>
            <MissionProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <Toast config={toastConfig} />
            </MissionProvider>
          </CharIdProvider>
        </CharacterCreateProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
