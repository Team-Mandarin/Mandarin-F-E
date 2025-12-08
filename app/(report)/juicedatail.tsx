import JuiceDetailPage from "@/components/report/juicedetailpage";
import Header from "@/components/ui/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JuiceDetailScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <JuiceDetailPage />
    </SafeAreaView>
  );
}
