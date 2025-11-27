import { cssInterop } from "nativewind";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const REGULAR_FONT = "Default-Font";
const BOLD_FONT = "Default-Font-Bold";
const MEDIUM_FONT = "Default-Font-Medium";
const LIGHT_FONT = "Default-Font-Light";
const THIN_FONT = "Default-Font-Thin";

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
  mediumFont: {
    fontFamily: MEDIUM_FONT,
    fontWeight: "normal",
  },
  lightFont: {
    fontFamily: LIGHT_FONT,
    fontWeight: "normal",
  },
  thinFont: {
    fontFamily: THIN_FONT,
    fontWeight: "normal",
  },
});

interface MandarinTextProps extends TextProps {
  className?: string;
}

function MandarinText({ style, className, ...props }: MandarinTextProps) {
  const classNames = className || "";
  const flatStyle = StyleSheet.flatten(style);

  const isBoldStyle =
    flatStyle?.fontWeight === "bold" || flatStyle?.fontWeight === "700";

  const isMediumStyle =
    flatStyle?.fontWeight === "semibold" ||
    flatStyle?.fontWeight === "600" ||
    flatStyle?.fontWeight === "medium" ||
    flatStyle?.fontWeight === "500";

  const isLightStyle =
    flatStyle?.fontWeight === "light" || flatStyle?.fontWeight === "300";

  const isThinStyle =
    flatStyle?.fontWeight === "thin" || flatStyle?.fontWeight === "100";

  return (
    <Text
      className={className}
      style={[
        styles.default,
        style,
        isBoldStyle && styles.boldFont,
        isLightStyle && styles.lightFont,
        isMediumStyle && styles.mediumFont,
        isThinStyle && styles.thinFont,
      ]}
      {...props}
    />
  );
}

cssInterop(MandarinText, {
  className: "style",
});

export default MandarinText;
