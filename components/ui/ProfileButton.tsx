import Icon from "@/assets/svg/arrow.svg";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import MandarinText from "./MandarinText";

interface MandarinButtonProps extends PressableProps {
  label: string;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

export default function ProfileButton({
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
      className={`w-[95%] py-4 rounded-2xl items-center justify-center flex-row h-[61px] ${
        className || "bg-white"
      }`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View className="flex-row items-center gap-2 justify-between w-full px-6">
          <MandarinText
            className={`text-lg font-bold ${textClassName || "text-black"}`}
          >
            {label}
          </MandarinText>
          <Icon />
        </View>
      )}
    </Pressable>
  );
}
