import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const ScoreCircle = ({ score = 0, size = 160, strokeWidth = 18 }) => {
  // 1. 원의 반지름 및 둘레 계산
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // 2. 점수에 따른 오프셋 계산 (점수만큼 채워짐)
  // strokeDashoffset은 '채워지지 않은 나머지 길이'를 의미합니다.
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // 색상 설정 (이미지와 유사한 컬러 하드코딩 혹은 테일윈드 색상 사용 가능)
  const activeColor = "#F5A543"; // 진한 주황색
  const trackColor = "#FDE8C7"; // 연한 주황색 (배경)

  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* SVG 캔버스 */}
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경이 되는 연한 원 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* 점수를 나타내는 진한 원 */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference} // 전체 둘레 길이
          strokeDashoffset={strokeDashoffset} // 점수만큼만 보이게 설정
          strokeLinecap="round" // 끝부분을 둥글게 처리
          rotation="-90" // 12시 방향부터 시작하도록 회전
          origin={`${size / 2}, ${size / 2}`} // 회전 축을 원 중심으로 설정
        />
      </Svg>

      {/* 중앙 텍스트 (absolute로 SVG 위에 띄움) */}
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-3xl font-bold text-[#F5A543]">{score}점</Text>
      </View>
    </View>
  );
};

export default ScoreCircle;
