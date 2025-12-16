import { chatService } from "@/services/chatService";
import { Simulation } from "@/types/api";
import { useEffect, useState } from "react";
import { View } from "react-native";
import ChatListCard from "./chatlistcard";

export default function ChatListPage({ characterId }: { characterId: number }) {
  const [chatList, setChatList] = useState<Simulation[]>([]);

  useEffect(() => {
    const fetchChatList = async () => {
      const response = await chatService.getChatList(characterId);
      // setChatList(response.data || []);
    };
    fetchChatList();
  }, [characterId]);

  return (
    <View className="mt-4">
      {chatList.map((chat) => (
        <ChatListCard key={chat.character_id} chat={chat} />
      ))}
    </View>
  );
}
