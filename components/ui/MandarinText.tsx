import { cssInterop } from "nativewind";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

// ⚠️ _layout.tsx에 적힌 이름과 토씨 하나 틀리지 않고 똑같아야 합니다!
const REGULAR_FONT = "Default-Font";
const BOLD_FONT = "Default-Font-Bold";

const styles = StyleSheet.create({
  default: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#000000",
  },
  // iOS에서 볼드 폰트 파일을 강제로 쓰게 하기 위한 스타일
  boldFont: {
    fontFamily: BOLD_FONT,
    fontWeight: "normal", // 중요: 폰트 파일 자체가 굵으므로 시스템 굵기는 끕니다.
  },
});

interface MandarinTextProps extends TextProps {
  isBold?: boolean;
  className?: string;
}

function MandarinText({
  style,
  isBold = false,
  className,
  ...props
}: MandarinTextProps) {
  // 1. 스타일을 평탄화해서 분석 (NativeWind의 font-bold 감지용)
  const flatStyle = StyleSheet.flatten(style);

  // 2. 볼드 여부 판단: isBold 속성 OR className에 'font-bold' OR style에 fontWeight
  const isBoldStyle =
    isBold ||
    className?.includes("font-bold") ||
    flatStyle?.fontWeight === "bold" ||
    flatStyle?.fontWeight === "700";

  return (
    <Text
      className={className}
      style={[
        styles.default, // 기본 폰트 적용

        style, // 외부 스타일 (색상, 크기 등) 적용

        // 🔥 [핵심] 볼드면 폰트 파일을 교체해버립니다. (순서가 중요: style 뒤에 와야 함)
        isBoldStyle && styles.boldFont,
      ]}
      {...props}
    />
  );
}

// NativeWind 연결
cssInterop(MandarinText, {
  className: "style",
});

export default MandarinText;
