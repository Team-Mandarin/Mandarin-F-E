import { chat } from "@/constants/chat";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import MandarinText from "../ui/MandarinText";
import AiChat from "./aichat";
import UserChat from "./userchat";

export default function ChatPage({ simulationId }: { simulationId?: string }) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<
    { id: number; sender: string; content: string }[]
  >([]);

  const handleMessageSend = () => {
    const userMessage = {
      id: messageList.length + 1,
      sender: "user",
      content: message,
    };

    const aiMessage = {
      id: messageList.length + 2,
      sender: chat[step].sender,
      content: chat[step].content,
    };

    setMessageList([...messageList, userMessage, aiMessage]);
    setMessage("");
    setStep(step + 1);
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        keyboardShouldPersistTaps="handled"
        className="mx-4"
      >
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
              image={require("@/assets/images/character/4.jpeg")}
            />
          ) : (
            <UserChat key={msg.id} label={msg.content} />
          )
        )}
      </ScrollView>
      <MandarinText className="text-xs text-center mt-4 text-[#6C6C6C]">
        해당 채팅은 AI로 생성한 가상 캐릭터와 나눈 대화입니다.
      </MandarinText>
      <View className="flex-row items-center justify-between mt-2 px-8 py-2 bg-[#FFB846]">
        <TextInput
          className="bg-white w-80 text-[#FF9D00] px-2"
          placeholder="메시지를 입력해 주세요"
          placeholderTextColor={"#FF9D00"}
          value={message}
          onChangeText={setMessage}
        />
        <Pressable onPress={handleMessageSend}>
          <Ionicons name="send" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
}
