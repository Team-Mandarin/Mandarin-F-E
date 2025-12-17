import React from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface KeyboardAwareProps {
  className?: string;
  children: React.ReactNode;
}

const KeyboardAwareView = ({ children, className }: KeyboardAwareProps) => {
  return (
    <SafeAreaView className={`flex-1 ${className}`}>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <View className="flex-1">{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAwareView;
