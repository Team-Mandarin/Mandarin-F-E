import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface KeyboardAwareProps {
  className?: string;
  children: React.ReactNode;
}

const KeyboardAwareView = ({ children, className }: KeyboardAwareProps) => {
  return (
    <SafeAreaView className={`flex-1 ${className}`}>
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KeyboardAwareView;
