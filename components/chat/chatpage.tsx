import { SERVER_URL } from "@/lib/api";
import { chatService } from "@/services/chatService";
import { Character } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import MandarinText from "../ui/MandarinText";
import AiChat from "./aichat";
import UserChat from "./userchat";

export default function ChatPage({ simulationId }: { simulationId?: string }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [messageList, setMessageList] = useState<
    { id: number; sender: string; content: string }[]
  >([]);

  useEffect(() => {
    const fetchCharacter = async () => {};

    const fetchSimulation = async () => {
      const response = await chatService.getSimulation(Number(simulationId));
      setIsFinished(response.data.isFinished);

      const responseCharacter = await chatService.getCharacter(
        response.data.characterId
      );
      setCharacter(responseCharacter.data);
    };

    const fetchSimulationHistory = async () => {
      const response = await chatService.getSimulationHistory(
        Number(simulationId)
      );

      if (response.data && Array.isArray(response.data)) {
        // 타임스탬프 순서대로 정렬
        const sortedMessages = [...response.data].sort((a, b) => {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        });

        // messageList 형식으로 변환
        const formattedMessages = sortedMessages.map((msg, index) => ({
          id: new Date(msg.timestamp).getTime() + index, // 타임스탬프를 기반으로 고유 ID 생성
          sender: msg.sender === "assistant" ? "ai" : msg.sender, // "assistant"를 "ai"로 변환
          content: msg.content,
        }));

        setMessageList(formattedMessages);
      }
    };

    fetchCharacter();
    fetchSimulation();
    fetchSimulationHistory();
  }, [simulationId]);

  const handleMessageSend = () => {
    setIsLoading(true);

    const currentMessage = message; // ✅ 먼저 저장
    const userMessage = {
      id: Date.now(), // ✅ 고유 ID
      sender: "user",
      content: currentMessage,
    };

    setMessageList((prev) => [...prev, userMessage]); // ✅ 함수형 업데이트
    setMessage("");
    handleAiMessage(currentMessage); // ✅ message를 인자로 전달
  };

  const handleAiMessage = async (userMessageContent: string) => {
    const response = await chatService.sendMessage({
      simulationId: Number(simulationId),
      userMessage: userMessageContent, // ✅ 전달받은 값 사용
    });

    const aiMessage = {
      id: Date.now() + 1, // ✅ 고유 ID
      sender: "ai",
      content: response.reply,
    };

    setMessageList((prev) => [...prev, aiMessage]); // ✅ 함수형 업데이트
    setIsLoading(false);
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 mx-4">
        <View className="bg-[#ECECEC] rounded-2xl mx-auto px-4 py-2 my-2 flex-row items-center gap-2 w-96 mb-4">
          <Ionicons name="megaphone" size={24} color="#FFCD29" />
          <MandarinText className="text-sm">
            콘텐츠전송하고 싶은 메시지는 나눠보내지 않고 한번에 전송해주세요.
            먼저 메시지를 보내주세요!
          </MandarinText>
        </View>
        {messageList.map((msg) =>
          msg.sender === "ai" ? (
            <AiChat
              key={msg.id}
              label={msg.content}
              image={`${SERVER_URL}/uploads/${character?.characterImg}`}
            />
          ) : (
            <UserChat key={msg.id} label={msg.content} />
          )
        )}
        {isLoading && (
          <View className="flex-row items-start mt-2 mb-2">
            <View className="w-10 h-10 rounded-full mr-2" />
            <View className="bg-[#F3F5F7] px-4 py-3 max-w-64 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="#FF9D00" />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <MandarinText className="text-xs text-center mt-4 text-[#6C6C6C]">
        해당 채팅은 AI로 생성한 가상 캐릭터와 나눈 대화입니다.
      </MandarinText>
      {isFinished ? (
        <MandarinText className="text-center mt-4 text-[#6C6C6C]">
          채팅이 종료되었습니다.
        </MandarinText>
      ) : (
        <View className="flex-row items-center justify-between mt-2 px-8 py-2 bg-[#FFB846]">
          <TextInput
            className="bg-white w-80 text-[#FF9D00] px-2"
            placeholder="메시지를 입력해 주세요"
            placeholderTextColor={"#FF9D00"}
            value={message}
            onChangeText={setMessage}
          />
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Pressable onPress={handleMessageSend}>
              <Ionicons name="send" size={24} color="white" />
            </Pressable>
          )}
        </View>
      )}
    </>
  );
}
