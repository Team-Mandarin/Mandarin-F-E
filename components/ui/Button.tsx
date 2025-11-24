import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import MandarinText from "./MandarinText";

interface MandarinButtonProps extends PressableProps {
  label: string;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  label,
  onPress,
  isLoading = false,
  disabled,
  className,
  ...props
}: MandarinButtonProps) {
  return (
    <Pressable
      onPress={isLoading || disabled ? undefined : onPress}
      disabled={isLoading || disabled}
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
          }`}
        >
          {label}
        </MandarinText>
      )}
    </Pressable>
  );
}
