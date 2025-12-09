import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface MandarinHeaderProps {
  title?: string;
  showBackButton?: boolean;
  className?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

export default function Header({
  title = "",
  showBackButton = true,
  className,
  onBack,
  children,
}: MandarinHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View>
      <View className="w-full h-14 flex-row items-center justify-between px-4">
        <View className="w-10">
          {showBackButton && (
            <Pressable onPress={handleBack} className="p-2 -ml-2">
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          )}
        </View>

        <View className="flex-1 items-center">
          {title ? (
            <MandarinText
              className={`text-2xl font-bold text-black ${className}`}
            >
              {title}
            </MandarinText>
          ) : null}
        </View>

        <View className="w-10">{children}</View>
      </View>
    </View>
  );
}
