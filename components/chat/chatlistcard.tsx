import { Simulation } from "@/types/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import MandarinText from "../ui/MandarinText";

export default function ChatListCard({ chat }: { chat: Simulation }) {
  return (
    <View className="flex-row items-center justify-between px-8 my-4">
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/charchat",
            params: { simulationId: chat.simulation_id },
          })
        }
      >
        <View>
          <View className="flex-row items-center">
            {chat.is_finished ? (
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
            <MandarinText className="text-xl font-semibold ml-2">
              {chat.simulation_name}
            </MandarinText>
          </View>
          <View>
            <MandarinText className="text-xs text-[#737373]">
              {chat.purpose} | {chat.category} | {chat.time}{" "}
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
