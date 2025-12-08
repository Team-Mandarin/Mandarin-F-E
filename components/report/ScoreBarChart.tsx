import React from "react";
import { Text, View } from "react-native";

interface ScoreBarChartProps {
  label_key: number[];
  label_score: number[];
  labels?: string[]; // 커스텀 라벨 이름
}

const ScoreBarChart = ({
  label_key,
  label_score,
  labels,
}: ScoreBarChartProps) => {
  const data = label_key.map((key, index) => ({
    label: labels?.[index] ?? key, // 커스텀 라벨이 있으면 사용, 없으면 key 사용
    score: label_score[index],
  }));

  // 최대 높이 설정 (화면 비율에 맞게 조절 가능)
  const MAX_HEIGHT = 200;

  // 점수에 따른 투명도 계산 (최소 0.3 ~ 최대 1.0)
  const getOpacity = (score: number) => {
    return 0.3 + (score / 100) * 0.7;
  };

  return (
    <View className="w-full bg-white p-6">
      {/* 그래프 컨테이너: 가로 정렬, 아래쪽 정렬(items-end)이 핵심 */}
      <View className="flex-row justify-around items-end h-[250px]">
        {data.map((item, index) => {
          // 점수에 따른 높이 계산
          const barHeight = (item.score / 100) * MAX_HEIGHT;

          return (
            <View key={index} className="items-center w-20">
              {/* 바 위에 점수 표시 */}
              <Text className="text-gray-800 font-medium mb-2">
                {item.score}점
              </Text>

              {/* 막대 그래프 본체 - #FC9B00 색상에 점수별 투명도 적용 */}
              <View
                className="w-16 rounded-t-full"
                style={{
                  height: barHeight,
                  backgroundColor: `rgba(252, 155, 0, ${getOpacity(
                    item.score
                  )})`,
                }}
              />

              {/* 바 아래 라벨 표시 */}
              <Text className="text-black font-medium mt-3 text-base">
                {item.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ScoreBarChart;
