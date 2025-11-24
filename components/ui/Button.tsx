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
  textClassName,
  ...props
}: MandarinButtonProps) {
  return (
    <Pressable
      onPress={isLoading || disabled ? undefined : onPress}
      disabled={isLoading || disabled}
      className={`w-full py-4 rounded-2xl items-center justify-center flex-row bg-[#FF9D00] ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <MandarinText
          className={`text-lg font-bold ${textClassName || "text-white"}`}
        >
          {label}
        </MandarinText>
      )}
    </Pressable>
  );
}
