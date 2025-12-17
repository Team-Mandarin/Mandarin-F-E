import { authService } from "@/services/authService";
import { chatService } from "@/services/chatService";
import { userService } from "@/services/userService";
import { Character, User } from "@/types/api";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import ChatCreateLoad from "../../app/(character)/chatcreateload";
import MandarinText from "../ui/MandarinText";
import AiChat from "./aichat";
import UserButton from "./userbutton";

import {
  CATEGORY_OPTIONS,
  CategoryType,
  PURPOSE_LABELS,
  PurposeType,
} from "@/constants/simulationType";

const MANDARIN_IMG = require("@/assets/images/mandarin_large.png");

const GUIDE_MESSAGES: Record<PurposeType, string> = {
  PAST: "시뮬레이션을 통해 후회하는 행동에 대한 구체적인 상황이나 주제를 알려주세요.",
  FUTURE:
    "시뮬레이션을 통해 불확실성을 줄이고 연습을 하고 싶은 구체적인 상황이나 주제를 알려주세요.",
};

export default function ChatCreatePage({
  characterId,
}: {
  characterId: number;
}) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [user, setUser] = useState<User | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const id = Number(await authService.getId());
      const response = await userService.getUser(id);
      setUser(response);
    };

    const fetchCharacter = async () => {
      const response = await chatService.getCharacter(characterId);
      setCharacter(response.data);
      console.log(response);
    };

    fetchUser();
    fetchCharacter();
  }, []);

  const [selectedPurpose, setSelectedPurpose] = useState<PurposeType | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const handlePurposeSelect = (purpose: PurposeType) => {
    setSelectedPurpose(purpose);
  };
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const [chatName, setChatName] = useState<string>("");
  const [isEditingChatName, setIsEditingChatName] = useState(false);
  const [chatNameConfirmed, setChatNameConfirmed] = useState(false);

  const handleChatNameSubmit = () => {
    if (chatName.trim()) {
      setIsEditingChatName(false);
      setChatNameConfirmed(true);
    }
  };

  const createSimulation = async () => {
    setIsLoading(true);
    const simulation = await chatService.createSimulation({
      id: Number(user?.data.id),
      characterId: character?.characterId || -1,
      simulationName: chatName,
      purpose: selectedPurpose || "",
      category: selectedCategory || "",
      time: date?.toISOString() || "",
    });
    setIsLoading(false);
    console.log(simulation);
    router.replace({
      pathname: "/chatcreateload",
      params: {
        simulationId: String(simulation.simulationId),
      },
    });
  };

  return isLoading ? (
    <ChatCreateLoad setIsLoading={setIsLoading} isLoading={isLoading} />
  ) : (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-4 py-2 mb-2">
          <AiChat
            label={`안녕하세요! 저는 ${user?.data.username}님의 연애 시뮬레이션을 도와드릴 만다린이에요!`}
            image={MANDARIN_IMG}
          />
          <AiChat
            label={`${character?.characterName}(이)랑 대화 시뮬레이션을 진행하기 전에, ${user?.data.username}님의 고민을 정확히 파악하기 위해 몇 가지 질문을 드릴게요`}
          />
          <AiChat
            label={`${user?.data.username}님은 ${character?.characterName}(와)과의 관계에서 '후회'를 다루고 싶으신가요, 아니면 '불확실성'을 다루고 싶으신가요?`}
          />

          <View className="flex-row gap-2 justify-end mb-3">
            <UserButton
              className="w-24"
              label="후회"
              onPress={() => handlePurposeSelect("PAST")}
              selected={selectedPurpose === "PAST"}
            />
            <UserButton
              className="w-24"
              label="불확실성"
              onPress={() => handlePurposeSelect("FUTURE")}
              selected={selectedPurpose === "FUTURE"}
            />
          </View>

          {selectedPurpose && (
            <>
              <AiChat
                label={`${PURPOSE_LABELS[selectedPurpose]}(을)를 다루고 싶으시군요!`}
                image={MANDARIN_IMG}
              />
              <AiChat label={GUIDE_MESSAGES[selectedPurpose]} />
              {CATEGORY_OPTIONS[selectedPurpose].map((option) => (
                <UserButton
                  key={option.value}
                  className="w-60"
                  label={option.label}
                  onPress={() => setSelectedCategory(option.value)}
                  selected={selectedCategory === option.value}
                />
              ))}
            </>
          )}
          {selectedCategory && (
            <>
              <AiChat
                label={`시뮬레이션하고 싶은 상황을 이해했어요!`}
                image={MANDARIN_IMG}
              />
              <AiChat
                label={`마지막으로, 이 상황이 언제 일어났던 일인지 알려주세요.`}
              />
              <View className="flex-row justify-end mb-1">
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <View
                    className={`px-4 py-3 rounded-2xl w-60 ${
                      date ? "bg-[#FF9D00]" : "bg-[#FFC300]"
                    }`}
                  >
                    <MandarinText className="text-white text-sm text-center">
                      {date ? formatDate(date) : "날짜 선택"}
                    </MandarinText>
                  </View>
                </Pressable>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </>
          )}
          {date && (
            <>
              <AiChat
                label={`완벽해요! ${user?.data.username}님의 ${
                  character?.characterName
                }과(와)의 대화가 있었던 ${formatDate(date)}으로 돌아갈게요`}
                image={MANDARIN_IMG}
              />
              <AiChat label={`마지막으로 사용할 채팅방 이름을 설정해주세요.`} />
              <View className="flex-row justify-end mb-1">
                {isEditingChatName ? (
                  <View className="flex-row items-center gap-2">
                    <TextInput
                      className="px-4 py-3 rounded-2xl w-60 bg-white border border-[#FF9D00] text-sm"
                      value={chatName}
                      onChangeText={setChatName}
                      placeholder="채팅방 이름 입력"
                      autoFocus
                      onSubmitEditing={handleChatNameSubmit}
                      returnKeyType="done"
                    />
                    <Pressable onPress={handleChatNameSubmit}>
                      <View className="px-4 py-3 rounded-2xl bg-[#FF9D00]">
                        <MandarinText className="text-white text-sm">
                          확인
                        </MandarinText>
                      </View>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable onPress={() => setIsEditingChatName(true)}>
                    <View
                      className={`px-4 py-3 rounded-2xl w-60 ${
                        chatNameConfirmed ? "bg-[#FF9D00]" : "bg-[#FFC300]"
                      }`}
                    >
                      <MandarinText className="text-white text-sm text-center">
                        {chatName || "채팅방 이름 설정"}
                      </MandarinText>
                    </View>
                  </Pressable>
                )}
              </View>
              {chatNameConfirmed && (
                <>
                  <AiChat
                    label={`${character?.characterName}을 만나러 가시겠어요?`}
                    image={MANDARIN_IMG}
                  />
                  <UserButton
                    className="w-60 bg-[#A0C862]"
                    label="만나러 가기"
                    onPress={() => {
                      createSimulation();
                    }}
                  />
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
