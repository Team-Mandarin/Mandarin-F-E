import MandarinText from "@/components/ui/MandarinText";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <MandarinText className="text-2xl font-bold">프로필</MandarinText>
      </View>
    </SafeAreaView>
  );
}

