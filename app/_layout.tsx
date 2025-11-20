import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

function useLoadedFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          "Default-Font-Bold": require("../assets/fonts/SpoqaHanSansNeo-Bold.otf"),
          "Default-Font-Light": require("../assets/fonts/SpoqaHanSansNeo-Light.otf"),
          "Default-Font-Medium": require("../assets/fonts/SpoqaHanSansNeo-Medium.otf"),
          "Default-Font": require("../assets/fonts/SpoqaHanSansNeo-Regular.otf"),
          "Default-Font-Thin": require("../assets/fonts/SpoqaHanSansNeo-Thin.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoaded(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return loaded;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isLoadingComplete = useLoadedFonts();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
