import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginBottom: 5,
    marginLeft: 5,
    color: theme.colors.error
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        {...field}
        {...props}
        showError={showError}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;