// src/components/ui/MandarinText.tsx

import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

// 폰트 파일 이름은 loadAsync와 일치해야 함
// _layout.tsx에서 정의한 폰트 이름
const REGULAR_FONT = "Default-Font";
const BOLD_FONT = "Default-Font-Bold";

// 모든 Text 컴포넌트의 기본 폰트 스타일 정의
const styles = StyleSheet.create({
  // **주의:** 이 스타일이 모든 텍스트에 적용되는 기본 스타일임
  default: {
    fontFamily: REGULAR_FONT, // 로드한 기본 폰트 패밀리 적용
    // fontSize: 16, // 기본 폰트 크기 설정
    // color: '#333333',       // 필요한 경우 기본 텍스트 색상 정의 가능
  },
  bold: {
    fontFamily: BOLD_FONT, // 굵은 텍스트를 위한 별도의 폰트 파일 적용
  },
});

/**
 * 만다린 앱의 모든 텍스트에 일관된 폰트 스타일을 적용하는 커스텀 Text 컴포넌트
 * * @param isBold - 텍스트를 굵게 표시할지 여부 (fontFamily를 BOLD_FONT로 변경)
 * @param style - 외부에서 전달된 스타일 (우선순위가 가장 높음)
 */

interface MandarinTextProps extends TextProps {
  // 굵은 폰트 파일로 전환할 수 있는 선택적 prop
  isBold?: boolean;
  // TextProps에서 style을 확장하여 Type Safe하게 만듦
  style?: StyleProp<TextStyle>;
  className?: string;
}

export default function MandarinText({
  style,
  isBold = false,
  className,
  ...props
}: MandarinTextProps) {
  return (
    <Text
      className={className}
      style={[
        styles.default, // 1. 기본 폰트 (Mandarin-Regular) 적용
        isBold && styles.bold, // 2. isBold가 true일 경우 굵은 폰트 덮어쓰기
        style, // 3. 외부에서 전달된 스타일(폰트 크기, 색상 등) 적용
      ]}
      {...props}
    />
  );
}
