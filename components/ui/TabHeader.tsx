import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import MandarinText from "./MandarinText";

interface TabHeaderProps {
  title: string;
  showRightButton?: boolean;
  className?: string;
  rightIconName?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export default function TabHeader({ 
    title, 
    showRightButton = false, 
    className = "", 
    rightIconName = "add", 
    onRightPress,
    }: TabHeaderProps) {

  return (
    <View className={`w-full h-12 flex-row items-center justify-between pl-[30px] pr-4 ${className}`}>
        {/* 제목 */}
        <View className="flex-1 items-start">
            <MandarinText className="text-3xl font-bold text-black">
                {title}
            </MandarinText>
        </View>

        {/* 우측 버튼 */}
        <View className="w-10 items-end">
            {showRightButton && (
                <Pressable onPress={onRightPress} className="p-2">
                    <Ionicons name={rightIconName} size={25} color="black"/>
                </Pressable>
            )}
        </View>
    </View>
  );
}