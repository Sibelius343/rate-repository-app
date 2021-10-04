import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    padding: 4,
    color: 'white' 
  }
});

const Language = ({ language, style, ...props }) => {
  return (
    <Text style={[styles.language, style]} {...props}>{language}</Text>
  );
};

export default Language;