// app/(character)/char_add1.tsx

import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // 📅 날짜 선택 라이브러리
import * as ImagePicker from "expo-image-picker"; // 📷 이미지 선택 라이브러리
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select"; // 🎡 나이 선택 라이브러리
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

// 커스텀 컴포넌트 임포트
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Header from "@/components/ui/Header";
import MandarinText from "@/components/ui/MandarinText";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";

// --- 상수 및 도우미 컴포넌트 ---

// 나이 선택지 데이터 (15세부터 80세까지)
const AGE_ITEMS = Array.from({ length: 66 }, (_, i) => ({
  label: String(i + 14),
  value: String(i + 14),
}));

// 관계 유형 버튼 컴포넌트
interface RelationshipButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const RelationshipButton: React.FC<RelationshipButtonProps> = ({
  label,
  isSelected,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    className={`w-[97px] h-[106px] rounded-xl items-center justify-center border ${
      isSelected
        ? "bg-[#FF9D00] border-[#FF9D00]"
        : "bg-white border-gray-300"
    }`}
    style={{ marginHorizontal: 10 }}
  >
    <MandarinText
      className={`text-[22px] font-medium ${
        isSelected ? "text-white" : "text-[#9999A9]"
      }`}
    >
      {label}
    </MandarinText>
  </Pressable>
);

export default function CharacterAdd1() {
  const insets = useSafeAreaInsets();
  const { data, updateData, resetData, isEditMode } = useCharacterCreate();
  
  // 폼 상태 관리
  const [name, setName] = useState("");
  const [age, setAge] = useState<string | null>(null); // 나이
  const [relationshipType, setRelationshipType] = useState<
    "SUM" | "LOVE" | "BREAKUP" | null
  >(null);
  const [dateMet, setDateMet] = useState<Date | null>(null); // 만난 날짜
  const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 표시 여부
  const [characterImage, setCharacterImage] = useState<string | null>(null); // 캐릭터 이미지
  const [showExitDialog, setShowExitDialog] = useState(false); // 나가기 다이얼로그 표시 여부

  // 편집 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && data) {
      setName(data.name || "");
      setAge(data.age || null);
      setRelationshipType(data.relationshipType || null);
      setDateMet(data.dateMet || null);
      setCharacterImage(data.characterImage || null);
    }
  }, [isEditMode]);

  // 갤러리에서 이미지 선택
  const pickImage = async () => {
    // 갤러리 접근 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert("갤러리 접근 권한이 필요합니다.");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCharacterImage(result.assets[0].uri);
    }
  };

  // '계속하기' 버튼 활성화 여부
  const isFormValid = name && age && relationshipType && dateMet;

  // 캘린더에서 날짜 선택 시
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // iOS는 DatePicker를 유지, Android는 닫기
    if (selectedDate) {
      setDateMet(selectedDate);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    // 유효성 검사
    if (!isFormValid) {
      Toast.show({
        type: "login",
        text1: "사진을 제외한 모든 항목을 입력해주세요",
        visibilityTime: 3000,
      });
      return;
    }

    // Context에 데이터 저장
    updateData({
      name,
      age,
      relationshipType,
      dateMet,
      characterImage,
    });
    
    console.log("폼 데이터:", { name, age, relationshipType, dateMet, characterImage }); 
    
    // char_add2로 이동
    router.push("/char_add2");
  };

  // 뒤로가기 처리
  const handleBack = () => {
    setShowExitDialog(true);
  };

  // 나가기 확인
  const handleExitConfirm = () => {
    setShowExitDialog(false);
    resetData(); // 모든 캐릭터 생성 데이터 초기화
    router.back();
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      <Header 
        showBackButton={true} 
        onBack={handleBack} 
        className="bg-[#FCFCFC]" 
      />
      
      <ScrollView 
        className="flex-1 px-5" 
        contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
      >
        
        {/* 1. 제목 및 설명 */}
        <View className="mt-5 mb-8 pl-5">
          <MandarinText className="text-[32px] font-bold mb-1">
            {isEditMode ? "캐릭터 수정" : "캐릭터 생성"}
          </MandarinText>
          <MandarinText className="text-[12px] text-[#737373] leading-4">
            [user_name]님의 연인에 대해 말해주세요.{"\n"}
            자세하게 말할수록 실제 연인과 비슷해지는 대화를 할 수 있어요.
          </MandarinText>
        </View>

        {/* 2. 캐릭터 사진 입력 */}
        <View className="mb-8">
          <MandarinText className="text-[23px] font-bold mb-3">
            캐릭터 사진
          </MandarinText>
          <Pressable
            className="w-[267px] h-[267px] bg-[#F2F2F2] rounded-2xl items-center justify-center self-center overflow-hidden"
            onPress={pickImage}
          >
            {characterImage ? (
              <Image 
                source={{ uri: characterImage }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="add" size={50} color="#9999A9" />
            )}
          </Pressable>
        </View>

        {/* 3. 이름 입력 */}
        <View className="mb-8">
          <MandarinText className="text-[23px] font-bold mb-3">이름</MandarinText>
          <TextInput
            placeholder="이름"
            placeholderTextColor="#9999A9"
            value={name}
            onChangeText={setName}
            className="w-[332px] h-[49px] bg-[#F2F2F2] rounded-xl px-4 text-[20px] text-gray-800 self-center"
          />
        </View>

        {/* 4. 나이 입력 (WheelPicker 통합) */}
        <View className="mb-8">
          <MandarinText className="text-[23px] font-bold mb-3">나이</MandarinText>
          <View className="w-[332px] h-[49px] bg-[#F2F2F2] rounded-xl self-center justify-center">
            <RNPickerSelect
              onValueChange={(value) => setAge(value)}
              items={AGE_ITEMS}
              placeholder={{ 
                label: "나이", 
                value: null, 
                color: '#9999A9' 
              }}
              style={{
                inputIOS: {
                  fontSize: 20,
                  fontWeight: '400',
                  paddingHorizontal: 16,
                  color: age ? '#1F2937' : '#9999A9',
                },
                inputAndroid: {
                  fontSize: 20,
                  fontWeight: '400',
                  paddingHorizontal: 16,
                  color: age ? '#1F2937' : '#9999A9',
                },
                placeholder: {
                  color: '#9999A9',
                  fontSize: 30,
                  fontWeight: '400',
                }
              }}
              value={age}
            />
          </View>
        </View>

        {/* 5. 관계 유형 선택 */}
        <View className="mb-8">
          <MandarinText className="text-[23px] font-bold mb-3">
            관계 유형
          </MandarinText>
          <View className="flex-row justify-center">
            <RelationshipButton
              label="썸"
              isSelected={relationshipType === "SUM"}
              onPress={() => setRelationshipType("SUM")}
            />
            <RelationshipButton
              label="연애"
              isSelected={relationshipType === "LOVE"}
              onPress={() => setRelationshipType("LOVE")}
            />
            <RelationshipButton
              label="결별"
              isSelected={relationshipType === "BREAKUP"}
              onPress={() => setRelationshipType("BREAKUP")}
            />
          </View>
        </View>

        {/* 6. 만난 날짜 (DateTimePicker 통합) */}
        <View className="mb-10">
          <MandarinText className="text-[23px] font-bold mb-3">
            만난 날짜
          </MandarinText>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="w-[332px] h-[49px] bg-[#F2F2F2] rounded-xl items-center justify-center self-center"
          >
            <MandarinText 
              className={`text-[20px] ${dateMet ? 'text-gray-800' : 'text-[#9999A9]'}`}
            >
              {dateMet ? dateMet.toLocaleDateString('ko-KR') : "날짜 선택"}
            </MandarinText>
          </Pressable>
          
          {/* DateTimePicker 렌더링 */}
          {showDatePicker && (
            <DateTimePicker
              value={dateMet || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {/* 7. 계속하기 버튼 */}
        <View className="mb-20 px-5">
          <Button 
            label="계속하기" 
            onPress={handleNext}
          />
        </View>
        
      </ScrollView>

      {/* 나가기 확인 다이얼로그 */}
      <ConfirmDialog
        visible={showExitDialog}
        title="정말 나가시나요?"
        message={isEditMode 
          ? `지금 나가시면 캐릭터 수정을 처음부터\n다시 시작해야해요.`
          : `지금 나가시면 캐릭터 생성을 처음부터\n다시 시작해야해요.`
        }
        confirmText="나가기"
        cancelText="취소"
        onConfirm={handleExitConfirm}
        onCancel={() => setShowExitDialog(false)}
      />
    </View>
  );
}

