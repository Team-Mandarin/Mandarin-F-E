import { View } from "react-native";
import ChatListCard from "./chatlistcard";

export default function ChatListPage() {
  const chatList = [
    {
      simulation_id: 1,
      id: 1,
      character_id: 0,
      simulation_name: "simulation_name_1",
      purpose: "FUTURE",
      category: "EMOTIONAL_MISTAKE",
      time: "2022-01-01",
      last_update_time: "2025-01-01",
      is_finished: false,
    },
    {
      simulation_id: 2,
      id: 2,
      character_id: 0,
      simulation_name: "simulation_name_2",
      purpose: "FUTURE",
      category: "EMOTIONAL_MISTAKE",
      time: "2022-01-01",
      last_update_time: "2025-01-01",
      is_finished: true,
    },
  ];

  return (
    <View className="mt-4">
      {chatList.map((chat) => (
        <ChatListCard key={chat.simulation_id} chat={chat} />
      ))}
    </View>
  );
}
