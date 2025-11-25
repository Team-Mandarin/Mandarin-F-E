import LoveTypePage from "@/components/auth/lovetypepage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLoveType() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LoveTypePage />
    </SafeAreaView>
  );
}
