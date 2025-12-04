import { BaseToast, ToastConfig } from "react-native-toast-message";

const FONT_SIZE_TEXT1 = 14;
const FONT_SIZE_TEXT2 = 14;

// 공통 토스트 스타일
const baseStyle = {
  borderRadius: 30,
  width: "auto" as const,
  minWidth: 224,
  height: "auto" as const,
  minHeight: 50,
  paddingVertical: 12,
  marginBottom: 130,
};

const contentContainerStyle = {
  paddingHorizontal: 20,
  justifyContent: "center" as const,
};

const text1Style = {
  fontSize: FONT_SIZE_TEXT1,
  color: "#EDEDED",
  fontWeight: "normal" as const,
  textAlign: "center" as const,
};

const text2Style = {
  fontSize: FONT_SIZE_TEXT2,
  color: "#EDEDED",
  textAlign: "center" as const,
};

export const toastConfig: ToastConfig = {
  // 기본 로그인 토스트
  login: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        ...baseStyle,
        borderLeftColor: "#484845",
        backgroundColor: "#484845",
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={3}
      text2NumberOfLines={2}
      text1={text1}
      text2={text2}
    />
  ),

  // 성공 토스트 (초록색)
  success: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        ...baseStyle,
        borderLeftColor: "#4CAF50",
        backgroundColor: "#4CAF50",
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={3}
      text2NumberOfLines={2}
      text1={text1}
      text2={text2}
    />
  ),

  // 에러 토스트 (빨간색)
  error: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        ...baseStyle,
        borderLeftColor: "#F44336",
        backgroundColor: "#F44336",
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={3}
      text2NumberOfLines={2}
      text1={text1}
      text2={text2}
    />
  ),

  // 경고 토스트 (주황색)
  warning: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        ...baseStyle,
        borderLeftColor: "#FF9800",
        backgroundColor: "#FF9800",
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={3}
      text2NumberOfLines={2}
      text1={text1}
      text2={text2}
    />
  ),

  // 정보 토스트 (파란색)
  info: ({ text1, text2, props }) => (
    <BaseToast
      {...props}
      style={{
        ...baseStyle,
        borderLeftColor: "#2196F3",
        backgroundColor: "#2196F3",
      }}
      contentContainerStyle={contentContainerStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={3}
      text2NumberOfLines={2}
      text1={text1}
      text2={text2}
    />
  ),
};
