import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import MandarinText from "./MandarinText";

interface MandarinInputProps extends TextInputProps {
  errorMessage?: string;
  containerClassName?: string;
}

export default function Input({
  errorMessage,
  containerClassName,
  className,
  ...props
}: MandarinInputProps) {
  return (
    <View className={`w-[335px] mb-3 ${containerClassName}`}>
      <View
        className={`w-full h-14 flex-row items-end border-b-2 border-black pb-1`}
      >
        <TextInput
          className={`flex-1 p-0 text-[25px] text-black ${className}`}
          placeholderTextColor="rgba(0, 0, 0, 0.50)"
          autoCapitalize="none"
          {...props}
        />
      </View>

      {errorMessage && (
        <MandarinText className="text-red-500 text-xs mt-2 ml-0">
          {errorMessage}
        </MandarinText>
      )}
    </View>
  );
}
