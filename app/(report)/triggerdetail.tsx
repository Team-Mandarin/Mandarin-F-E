import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TriggerDetail() {
  const { keyword } = useLocalSearchParams<{ keyword: string }>();
  return (
    <SafeAreaView>
      <Header title={keyword as string} className="font-medium" />
      <MandarinText>TriggerDetail</MandarinText>
    </SafeAreaView>
  );
}
