import MyLoveTypePage from "@/components/auth/mylovetypepage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthMyLoveType() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <MyLoveTypePage />
    </SafeAreaView>
  );
}
