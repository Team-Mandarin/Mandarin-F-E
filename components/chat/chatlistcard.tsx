import {
  CATEGORY_OPTIONS,
  CategoryType,
  PURPOSE_LABELS,
  PurposeType,
} from "@/constants/simulationType";
import { Simulation } from "@/types/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function ChatListCard({
  simulation,
}: {
  simulation: Simulation;
}) {
  const purpose = simulation.purpose as PurposeType;
  const category = simulation.category as CategoryType;

  const purposeLabel = PURPOSE_LABELS[purpose];

  const categoryLabel =
    CATEGORY_OPTIONS[purpose].find((opt) => opt.value === category)?.label ??
    "";
  return (
    <View className="flex-row items-center justify-between px-8 my-4">
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/charchat",
            params: { simulationId: String(simulation.simulationId) },
          })
        }
      >
        <View>
          <View className="flex-row items-center">
            {simulation.isFinished ? (
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#999999"
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* 1. 배경: 말풍선 */}
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color="#999999" // 말풍선 색상
                />

                {/* 2. 내부: 하트 (위로 겹침) */}
                <Ionicons
                  name="heart-outline"
                  size={16}
                  color="#999999" // 하트 색상
                  style={{ position: "absolute", paddingTop: 2 }} // 위치 미세 조정
                />
              </View>
            )}
            <MandarinText
              className="text-xl font-semibold ml-2 w-60"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {simulation.simulationName}
            </MandarinText>
          </View>
          <View>
            <MandarinText className="text-xs text-[#737373]">
              {purposeLabel} | {categoryLabel} | {simulation.time.slice(0, 10)}{" "}
            </MandarinText>
          </View>
        </View>
      </Pressable>
      {/* 삭제 api 연결 */}
      <Pressable onPress={() => {}}>
        <Ionicons name="trash-outline" size={24} color="#999999" />
      </Pressable>
    </View>
  );
}
