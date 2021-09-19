import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.fontWeightNormal,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  subHeading: {
    fontSize: theme.fontSizes.subHeading
  },
  bold: {
    fontWeight: theme.fontWeights.fontWeightBold
  }
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subHeading' && styles.subHeading,
    fontWeight === 'bold' && styles.bold,
    style
  ];

  return (
    <NativeText style={textStyle} {...props} />
  );
};

export default Text;