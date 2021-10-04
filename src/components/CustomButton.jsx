import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: 40,
    margin: 6,
    padding: 10,
    borderRadius: 3,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
  }
});

const CustomButton = ({ text, onPress, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText} fontWeight='bold'>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;