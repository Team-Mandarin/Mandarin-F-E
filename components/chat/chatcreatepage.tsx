import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import MandarinText from "../ui/MandarinText";
import AiChat from "./aichat";
import UserButton from "./userbutton";

type PurposeType = "PAST" | "FUTURE";
type CategoryType =
  | "EMOTIONAL_MISTAKE"
  | "MISCOMMUNICATION"
  | "CONTACT_ISSUE"
  | "BREAKUP_PROCESS"
  | "REALITY_PROBLEM"
  | "RELATION_TENSION"
  | "PERSONAL_BOUNDARY"
  | "FAMILY_FRIEND_ISSUE"
  | "BREAKUP_FUTURE"
  | "EVENT_PREPARATION";

const MANDARIN_IMG = require("@/assets/images/mandarin_large.png");

const PURPOSE_LABELS: Record<PurposeType, string> = {
  PAST: "후회",
  FUTURE: "불확실성",
};

const GUIDE_MESSAGES: Record<PurposeType, string> = {
  PAST: "시뮬레이션을 통해 후회하는 행동에 대한 구체적인 상황이나 주제를 알려주세요.",
  FUTURE:
    "시뮬레이션을 통해 불확실성을 줄이고 연습을 하고 싶은 구체적인 상황이나 주제를 알려주세요.",
};

const CATEGORY_OPTIONS: Record<
  PurposeType,
  { label: string; value: CategoryType }[]
> = {
  PAST: [
    { label: "감정적 다툼, 말실수", value: "EMOTIONAL_MISTAKE" },
    { label: "서운함, 불만 표현 실패", value: "MISCOMMUNICATION" },
    { label: "연락, 시간 배분 문제", value: "CONTACT_ISSUE" },
    { label: "고백, 이별 후속 처리", value: "BREAKUP_PROCESS" },
    { label: "현실적인 문제 대처", value: "REALITY_PROBLEM" },
  ],
  FUTURE: [
    { label: "고백, 관계 진전", value: "RELATION_TENSION" },
    { label: "민감한 요구나 부탁", value: "PERSONAL_BOUNDARY" },
    { label: "가족, 친구 문제", value: "FAMILY_FRIEND_ISSUE" },
    { label: "이별 통보, 대처", value: "BREAKUP_FUTURE" },
    { label: "기념일, 이벤트 계획", value: "EVENT_PREPARATION" },
  ],
};

export default function ChatCreatePage() {
  const scrollViewRef = useRef<ScrollView>(null);
  const username = "만다린";
  const charname = "캐릭터이름";
  const simulationId = 0;
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

  return (
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
            label={`안녕하세요! 저는 ${username}님의 연애 시뮬레이션을 도와드릴 만다린이에요!`}
            image={MANDARIN_IMG}
          />
          <AiChat
            label={`${charname}(이)랑 대화 시뮬레이션을 진행하기 전에, ${username}님의 고민을 정확히 파악하기 위해 몇 가지 질문을 드릴게요`}
          />
          <AiChat
            label={`${username}님은 ${charname}(와)과의 관계에서 '후회'를 다루고 싶으신가요, 아니면 '불확실성'을 다루고 싶으신가요?`}
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
                label={`완벽해요! ${username}님의 ${charname}과(와)의 대화가 있었던 ${formatDate(
                  date
                )}으로 돌아갈게요`}
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
                    label={`${charname}을 만나러 가시겠어요?`}
                    image={MANDARIN_IMG}
                  />
                  <UserButton
                    className="w-60 bg-[#A0C862]"
                    label="만나러 가기"
                    onPress={() => {
                      router.push({
                        pathname: "/charchat",
                        params: {
                          simulationId: String(simulationId),
                        },
                      });
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
