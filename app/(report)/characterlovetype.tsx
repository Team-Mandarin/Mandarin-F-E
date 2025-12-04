import CharacterLovetypePage from "@/components/report/characterlovetypepage";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharacterLovetype() {
  const { loveType, userName } = useLocalSearchParams<{
    loveType: string;
    userName: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <CharacterLovetypePage
        loveType={loveType || ""}
        userName={userName || ""}
      />
    </SafeAreaView>
  );
}
