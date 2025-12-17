import { chatService } from "@/services/chatService";
import { Simulation } from "@/types/api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import MandarinText from "../ui/MandarinText";
import ChatListCard from "./chatlistcard";

export default function ChatListPage({ characterId }: { characterId: number }) {
  const [chatList, setChatList] = useState<Simulation[]>([]);

  const fetchChatList = async () => {
    const response = await chatService.getChatList(characterId);
    console.log(response.data);
    setChatList(response.data || []);
  };

  useFocusEffect(
    useCallback(() => {
      fetchChatList();
    }, [])
  );

  return (
    <View className="mt-4">
      {chatList ? (
        chatList.map((simulation) => (
          <ChatListCard key={simulation.simulationId} simulation={simulation} />
        ))
      ) : (
        <MandarinText>새로운 채팅을 시작하세요.</MandarinText>
      )}
    </View>
  );
}
