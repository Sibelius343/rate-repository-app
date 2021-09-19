import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  language: {
    backgroundColor: 'blue',
    borderRadius: 3,
    padding: 3,
    color: 'white' 
  }
});

const Language = ({ language, style }) => {
  return (
    <Text style={[styles.language, style]}>{language}</Text>
  );
};

export default Language;