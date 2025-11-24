import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MandarinText from "./MandarinText";

interface MandarinHeaderProps {
  title?: string;
  showBackButton?: boolean;
  className?: string;
}

export default function Header({
  title = "",
  showBackButton = true,
  className,
}: MandarinHeaderProps) {
  return (
    <SafeAreaView edges={["top"]} className={`bg-white ${className}`}>
      <View className="w-full h-14 flex-row items-center justify-between px-4">
        <View className="w-10">
          {showBackButton && (
            <Pressable onPress={() => router.back()} className="p-2 -ml-2">
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          )}
        </View>

        <View className="flex-1 items-center">
          {title ? (
            <MandarinText className="text-lg font-bold text-black">
              {title}
            </MandarinText>
          ) : null}
        </View>

        <View className="w-10" />
      </View>
    </SafeAreaView>
  );
}
