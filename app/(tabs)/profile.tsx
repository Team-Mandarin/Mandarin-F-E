import ProfilePage from "@/components/profile/profilepage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex-1 bg-F6F5F3">
      <ProfilePage />
    </SafeAreaView>
  );
}
