import Arrow from "@/assets/svg/arrow.svg";
import { useMission } from "@/contexts/MissionContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
import MandarinText from "../ui/MandarinText";
import CheckBox from "../ui/ReportCheckBox";

export default function CharacterInfo({
  currentCharacter,
}: {
  currentCharacter: any;
}) {
  const { setCurrentCharacter, getCurrentMissions } = useMission();

  // 캐릭터가 변경될 때 해당 캐릭터의 미션 상태로 전환
  useEffect(() => {
    if (currentCharacter?.id && currentCharacter?.missions) {
      setCurrentCharacter(currentCharacter.id, currentCharacter.missions);
    }
  }, [currentCharacter]);

  // 현재 캐릭터의 미션 상태 가져오기
  const currentMissions = getCurrentMissions();
  const mission1Done = currentMissions?.mission1Done ?? false;
  const mission2Done = currentMissions?.mission2Done ?? false;
  const mission3Done = currentMissions?.mission3Done ?? false;

  const typeInfo = loveTypeInfo[currentCharacter.lovetype];

  if (!typeInfo) {
    return (
      <View className="flex-1 items-center justify-center">
        <MandarinText>러브타입 정보를 찾을 수 없습니다.</MandarinText>
      </View>
    );
  }
  return (
    <View>
      <View className="items-center mt-6 gap-4">
        <View className="flex-1 items-center w-96 bg-white rounded-2xl p-4">
          <Pressable
            className="w-full items-center"
            onPress={() =>
              router.push({
                pathname: "/characterlovetype",
                params: {
                  loveType: currentCharacter.lovetype,
                  userName: currentCharacter.name,
                },
              })
            }
          >
            <View className="flex-row items-center justify-between w-full items-start mb-2">
              <MandarinText className="text-2xl font-bold">
                연애 타입
              </MandarinText>

              <Arrow className="w-8 h-8" />
            </View>
            <MandarinText className="text-lg font-semibold self-start">
              {typeInfo.name}
            </MandarinText>
            <View className="items-center w-full">
              <Image
                source={typeInfo.image}
                style={{ height: 100, aspectRatio: 1 }}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        </View>

        <View className="bg-white w-96 rounded-xl p-4">
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/triggerpoint",
                params: {
                  keyword: currentCharacter.keyword,
                  percentage: currentCharacter.percentage,
                },
              })
            }
          >
            <View className="flex-row items-center justify-between w-full items-start mb-2">
              <MandarinText className="text-2xl font-bold">
                갈등 유발 지점
              </MandarinText>

              <Arrow className="w-8 h-8" />
            </View>
            <MandarinText className="text-base font-medium mt-6 mb-2">
              가장 부정적으로 반응했던 키워드
            </MandarinText>
            <View className="bg-[#FF7C7C] rounded-lg w-32 py-3">
              <MandarinText className="text-white text-xs font-medium text-center">
                #{currentCharacter.keyword}
              </MandarinText>
            </View>
            <MandarinText className="text-lg font-semibold mb-2 mt-6">
              위험도
            </MandarinText>
            <View className="flex-row items-center">
              <View className="flex-1 h-3 bg-[#FFD0D0] rounded-full overflow-hidden">
                <View
                  className="h-full bg-[#FF7C7C] rounded-full"
                  style={{ width: `${currentCharacter.percentage}%` }}
                />
              </View>
              <MandarinText className="ml-3 text-sm font-semibold text-[#8E8E8E]">
                {currentCharacter.percentage}%
              </MandarinText>
            </View>
          </Pressable>
        </View>

        <View className="bg-white rounded-xl w-96 p-4 mb-4">
          <Pressable onPress={() => router.push("/mission")}>
            <View className="flex-row items-center justify-between w-full items-start mb-2">
              <MandarinText className="text-2xl font-bold">
                효과적인 행동
              </MandarinText>

              <Arrow className="w-8 h-8" />
            </View>
            <MandarinText className="text-lg font-medium mb-3 mt-6">
              나의 행동 미션
            </MandarinText>
            <View className="gap-3">
              <CheckBox
                label={currentCharacter.missions[0]}
                checked={mission1Done}
                onCheckedChange={() => {}}
                labelClassName="text-base font-medium text-[#8E8E8E]"
              />
              <CheckBox
                label={currentCharacter.missions[1]}
                checked={mission2Done}
                onCheckedChange={() => {}}
                labelClassName="text-base font-medium text-[#8E8E8E]"
              />
              <CheckBox
                label={currentCharacter.missions[2]}
                checked={mission3Done}
                onCheckedChange={() => {}}
                labelClassName="text-base font-medium text-[#8E8E8E]"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
