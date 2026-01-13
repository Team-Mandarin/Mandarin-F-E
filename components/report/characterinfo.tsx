import Arrow from "@/assets/svg/arrow.svg";
import { chatService } from "@/services/chatService";
import { CharacterReports } from "@/types/api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { loveTypeInfo } from "../../constants/loveTypeInfo";
import MandarinText from "../ui/MandarinText";
import TriggerPoint from "./trigerpoint";

export default function CharacterInfo({
  currentCharacter,
}: {
  currentCharacter: any;
}) {
  const [characterReport, setCharacterReport] = useState<CharacterReports>();
  // 캐릭터가 변경될 때 해당 캐릭터의 미션 상태로 전환
  useEffect(() => {
    const fetchCharacterReport = async () => {
      const response = await chatService.getCharacterReport(
        currentCharacter.characterId
      );
      setCharacterReport(response);
    };
    fetchCharacterReport();
  }, [currentCharacter]);

  const typeInfo = loveTypeInfo[currentCharacter.loveType];

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
        <View className="flex-1 items-center w-96 h-56 bg-white rounded-2xl p-4">
          <Pressable
            className="w-full items-center"
            onPress={() =>
              router.push({
                pathname: "/characterlovetype",
                params: {
                  loveType: currentCharacter.loveType,
                  userName: currentCharacter.characterName,
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
                  characterReport: JSON.stringify(characterReport),
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
            {characterReport?.data?.map((report) => (
              <TriggerPoint key={report.reportCharacterId} report={report} />
            ))}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
