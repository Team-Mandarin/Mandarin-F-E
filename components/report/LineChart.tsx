import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg, { Circle, Line, Path, Text as SvgText } from "react-native-svg";

interface LineChartProps {
  data: number[];
  labels?: string[];
  className?: string;
}

export default function LineChart({ data, labels, className }: LineChartProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  const { width, height } = dimensions;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const yLabels = [0, 25, 50, 75, 100];

  const verticalLines = Array.from({ length: data.length + 1 }, (_, index) => ({
    x: padding.left + (index / data.length) * chartWidth,
  }));

  const points = data.map((value, index) => ({
    x: padding.left + ((index + 0.5) / data.length) * chartWidth,
    y: padding.top + chartHeight - (value / 100) * chartHeight,
  }));

  const createSmoothPath = () => {
    if (points.length < 2 || width === 0) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const prev = points[i - 1] || current;
      const afterNext = points[i + 2] || next;

      const tension = 0.3;
      const cp1x = current.x + (next.x - prev.x) * tension;
      const cp1y = current.y + (next.y - prev.y) * tension;
      const cp2x = next.x - (afterNext.x - current.x) * tension;
      const cp2y = next.y - (afterNext.y - current.y) * tension;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    return path;
  };

  return (
    <View className={className} onLayout={handleLayout}>
      {width > 0 && height > 0 && (
        <Svg width={width} height={height}>
          {yLabels.map((label, index) => {
            const y = padding.top + chartHeight - (index / 4) * chartHeight;
            return (
              <View key={`y-${index}`}>
                <SvgText
                  x={padding.left - 8}
                  y={y + 4}
                  fontSize={10}
                  fill="black"
                  textAnchor="end"
                >
                  {label}
                </SvgText>
                <Line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#F1F1F1"
                  strokeWidth={1}
                />
              </View>
            );
          })}

          {verticalLines.map((line, index) => (
            <Line
              key={`vline-${index}`}
              x1={line.x}
              y1={padding.top}
              x2={line.x}
              y2={padding.top + chartHeight}
              stroke="#F1F1F1"
              strokeWidth={1}
            />
          ))}

          <Path
            d={createSmoothPath()}
            stroke="#7987FF"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((point, index) => (
            <Circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={3}
              fill="#7987FF"
            />
          ))}

          {labels &&
            labels.map((label, index) => (
              <SvgText
                key={`x-${index}`}
                x={points[index].x}
                y={height - 8}
                fontSize={10}
                fill="black"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            ))}
        </Svg>
      )}
    </View>
  );
}
