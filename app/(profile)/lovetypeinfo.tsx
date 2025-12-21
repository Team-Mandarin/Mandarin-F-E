import LovetypeInfoCard from "@/components/profile/lovetypeinfocard";
import Header from "@/components/ui/Header";
import { loveTypeInfo } from "@/constants/loveTypeInfo";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LovetypeInfo() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="연애 타입 정보" />
      <ScrollView>
        <View className="flex-row flex-wrap px-4">
          {Object.entries(loveTypeInfo).map(([loveTypeId, type]) => (
            <View key={loveTypeId} className="w-1/2 px-2">
              <LovetypeInfoCard
                loveTypeId={Number(loveTypeId)}
                name={type.name}
                image={type.image}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
