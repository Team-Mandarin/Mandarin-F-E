import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { authService } from "@/services/authService";
import { chatService } from "@/services/chatService";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function CharacterAdd4() {
  const insets = useSafeAreaInsets();
  const [id, setId] = useState<number>(0);
  const [kakaoName, setKakaoName] = useState<string>("");

  useEffect(() => {
    const fetchId = async () => {
      const id = Number(await authService.getId());
      setId(id);
    };
    fetchId();
  }, []);

  // [수정 1] uploadedFile을 Context인 data에서 직접 가져옵니다.
  const { data, updateData, isEditMode, resetData } = useCharacterCreate();

  // [수정 1] 불필요한 로컬 state 삭제 (const [uploadedFile, setUploadedFile]...)

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // [추가] 로딩 상태

  // 편집 모드 등 초기화 로직은 Context 데이터가 있으므로 useEffect 불필요

  const handleBack = () => {
    if (isEditMode) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  };

  const getRelationTypeValue = (type: string | null): number => {
    if (type === "SUM") return 0; // 예: 썸 = 0
    if (type === "LOVE") return 1; // 예: 연애 = 1
    if (type === "BREAKUP") return 2; // 예: 이별 = 2
    return 0; // 기본값 (null일 경우)
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    resetData();
    router.replace("/(tabs)/chat");
  };

  // [수정 3] 실제 서버 전송 로직 구현
  const handleCreate = async () => {
    setIsLoading(true); // 로딩 시작

    try {
      const formData = new FormData();

      // ---------------------------------------------------------
      // 1. JSON 데이터 (DTO)
      // ---------------------------------------------------------
      const requestDto = {
        id: id,
        characterName: data.name,
        characterAge: Number(data.age),
        relationType: getRelationTypeValue(data.relationshipType),
        meetDate: data.dateMet
          ? data.dateMet.toISOString().split(".")[0]
          : new Date().toISOString().split(".")[0],
        loveType: data.loveType,
        historySum: data.history,
        kakaoName: kakaoName,
      };

      // 백엔드가 @RequestPart("json")으로 받으므로 키 이름을 "json"으로 설정
      formData.append("json", JSON.stringify(requestDto));

      // ---------------------------------------------------------
      // 2. 캐릭터 이미지 (character_img)
      // ---------------------------------------------------------
      if (data.characterImage) {
        const localUri = data.characterImage;
        const filename = localUri.split("/").pop() || "profile.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        // React Native 전용 파일 객체 포맷
        formData.append("character_img", {
          uri: localUri,
          name: filename,
          type: type,
        } as any);
      }

      // ---------------------------------------------------------
      // 3. 대화 내역 텍스트 파일 (full_dialogue)
      // ---------------------------------------------------------
      if (data.uploadedFile) {
        const localUri = data.uploadedFile;
        const filename = localUri.split("/").pop() || "dialogue.txt";

        formData.append("full_dialogue", {
          uri: localUri,
          name: filename,
          type: "text/plain", // txt 파일이므로 text/plain 고정
        } as any);
      }

      // ---------------------------------------------------------
      // 4. 서버 전송 (IP 주소 확인 필수!)
      // ---------------------------------------------------------
      console.log("formData:", formData);

      const response = await chatService.createCharacter(formData);

      if (response.code === 200) {
        // 성공 Toast 표시
        Toast.show({
          type: "success",
          text1: isEditMode
            ? "캐릭터 수정이 완료되었습니다"
            : "캐릭터 생성이 완료되었습니다",
          visibilityTime: 3000,
        });

        resetData(); // 데이터 초기화
        router.replace("/(tabs)/chat"); // 이동
      }
    } catch (error: any) {
      console.error("캐릭터 생성 실패:", error);
      Alert.alert(
        "생성 실패",
        "서버와 통신 중 오류가 발생했습니다.\n" +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 파일명 표시를 위한 헬퍼 변수
  const displayFileName = data.uploadedFile
    ? data.uploadedFile.split("/").pop()
    : "텍스트 파일 업로드";

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      <Header
        showBackButton={true}
        onBack={handleBack}
        className="bg-[#FCFCFC]"
      />

      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <View className="mt-5 mb-6 pl-5">
          <MandarinText className="text-[32px] font-bold mb-2">
            카카오톡 닉네임
          </MandarinText>
          {/* 내용 추가 */}
        </View>

        <TextInput
          placeholder="카카오톡 닉네임"
          placeholderTextColor="#9999A9"
          value={kakaoName}
          onChangeText={setKakaoName}
          className="w-[332px] h-[49px] bg-[#F2F2F2] rounded-xl px-4 text-[20px] text-gray-800 self-center"
        />
      </ScrollView>

      {/* 3. 생성하기/저장하기 버튼 - 하단 고정 */}
      <View
        className="w-[325px] self-center mb-10"
        style={{ paddingBottom: insets.bottom }}
      >
        {/* [수정 4] 로딩 중일 때는 인디케이터 표시 */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#FF9D00" />
        ) : (
          <Button
            textClassName="text-white"
            label={isEditMode ? "저장하기" : "생성하기"}
            onPress={handleCreate}
          />
        )}
      </View>

      <ConfirmDialog
        visible={showExitDialog}
        title="정말 나가시나요?"
        message={`지금 나가시면 캐릭터 수정을 처음부터\n다시 시작해야해요.`}
        confirmText="나가기"
        cancelText="취소"
        onConfirm={handleExitConfirm}
        onCancel={() => setShowExitDialog(false)}
      />
    </SafeAreaView>
  );
}
