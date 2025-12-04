import MissionCard from "@/components/report/missioncard";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useMission } from "@/contexts/MissionContext";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Mission() {
  const {
    getCurrentMissions,
    setMission1Done,
    setMission2Done,
    setMission3Done,
  } = useMission();

  // 현재 캐릭터의 미션 상태 가져오기
  const currentMissions = getCurrentMissions();
  const missions = currentMissions?.missions ?? [];
  const mission1Done = currentMissions?.mission1Done ?? false;
  const mission2Done = currentMissions?.mission2Done ?? false;
  const mission3Done = currentMissions?.mission3Done ?? false;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <View className="ml-8 mt-4">
        <View className="flex-row">
          <MandarinText className="text-2xl font-bold">
            행동 처방전
          </MandarinText>
          <MandarinText className="text-2xl font-medium">을</MandarinText>
        </View>
        <MandarinText className="text-2xl font-medium">
          제공해드려요
        </MandarinText>
      </View>
      <ScrollView>
        <MissionCard
          mission={missions[0]}
          className="bg-[#E3F2CC]"
          checked={mission1Done}
          setChecked={setMission1Done}
        />
        <MissionCard
          mission={missions[1]}
          className="bg-[#FFCECE]"
          checked={mission2Done}
          setChecked={setMission2Done}
        />
        <MissionCard
          mission={missions[2]}
          className="bg-[#FEEBC4]"
          checked={mission3Done}
          setChecked={setMission3Done}
        />
        <MandarinText className="text-center text-xs font-light text-[#8E8E8E] mt-6 mb-4">
          해당 정보는 참고용이며 무조건적인 신뢰는 지양해주세요.
        </MandarinText>
      </ScrollView>
    </SafeAreaView>
  );
}
