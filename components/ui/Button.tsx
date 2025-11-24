import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import MandarinText from "./MandarinText";

interface MandarinButtonProps extends PressableProps {
  label: string;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

export default function Button({
  label,
  onPress,
  isLoading = false,
  disabled,
  className,
  textClassName, // 👈 여기서 받아서
  ...props
}: MandarinButtonProps) {
  return (
    <Pressable
      onPress={isLoading || disabled ? undefined : onPress}
      disabled={isLoading || disabled}
      // className은 버튼 박스(배경색, 둥글기 등)에 적용
      className={`w-full py-4 rounded-2xl items-center justify-center flex-row ${
        disabled ? "bg-gray-300" : "bg-[#FF9D00] active:bg-orange-600"
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <MandarinText
          className={`text-lg font-bold ${
            disabled ? "text-gray-500" : "text-white"
          } ${textClassName}`}
        >
          {label}
        </MandarinText>
      )}
    </Pressable>
  );
}
