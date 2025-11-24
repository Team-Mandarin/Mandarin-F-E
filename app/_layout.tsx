import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [time, setTime] = useState(false);

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
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
