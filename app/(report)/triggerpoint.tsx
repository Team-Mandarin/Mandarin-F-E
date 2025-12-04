import TriggerPointPage from "@/components/report/triggerpointpage";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TriggerPoint() {
  const { keyword, percentage } = useLocalSearchParams<{
    keyword: string;
    percentage: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <MandarinText className="text-2xl font-bold ml-8 mt-4">
        갈등 유발 유형 TOP 3
      </MandarinText>
      <TriggerPointPage keyword={keyword} percentage={percentage} />
    </SafeAreaView>
  );
}
