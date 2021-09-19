import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3
  },
  error: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, name, onChange, onBlur, showError, ...props }) => {
  const textInputStyle = [styles.input, style, showError && styles.error];
  console.log(props);

  return <NativeTextInput style={textInputStyle} onChangeText={onChange(name)} onBlur={onBlur(name)} {...props} />;
};

export default TextInput;