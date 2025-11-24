import { cssInterop } from "nativewind";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const REGULAR_FONT = "Default-Font";
const BOLD_FONT = "Default-Font-Bold";

const styles = StyleSheet.create({
  default: {
    fontFamily: REGULAR_FONT,
    fontSize: 16,
    color: "#000000",
  },
  boldFont: {
    fontFamily: BOLD_FONT,
    fontWeight: "normal",
  },
});

interface MandarinTextProps extends TextProps {
  isBold?: boolean;
  className?: string;
}

function MandarinText({
  style,
  isBold = false,
  className,
  ...props
}: MandarinTextProps) {
  const flatStyle = StyleSheet.flatten(style);
  const isBoldStyle =
    isBold ||
    className?.includes("font-bold") ||
    flatStyle?.fontWeight === "bold" ||
    flatStyle?.fontWeight === "700";

  return (
    <Text
      className={className}
      style={[styles.default, style, isBoldStyle && styles.boldFont]}
      {...props}
    />
  );
}

cssInterop(MandarinText, {
  className: "style",
});

export default MandarinText;
