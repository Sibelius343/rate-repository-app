import React from "react";
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from "./CustomButton";
import { useHistory } from 'react-router-native';
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white'
  }
});

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 character long')
    .max(30, 'Username cannot be longer than 30 characters'),
  password: Yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password cannot be longer than 50 characters'),
  confirmPassword: Yup
    .string()
    .required('Please confirm password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const SignUpFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='username'
            placeholder='Username'
            testID='username'
          />
          <FormikTextInput
            name='password'
            placeholder='Password'
            testID='password'
            secureTextEntry
          />
          <FormikTextInput
            name='confirmPassword'
            placeholder='Confirm password'
            testID='confirmPassword'
            secureTextEntry
          />
          <CustomButton onPress={handleSubmit} text='Sign up' />
        </View>
      )}
    </Formik>
  );
};

const SignUpForm = () => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const handleSubmit = async ({ username, password }) => {
    try {
      const data = await signUp({ username, password });
      console.log('should be username', data.username);
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log('could not sign up', e.message);
    }
  };

  return (
    <SignUpFormContainer onSubmit={handleSubmit} />
  );
};

export default SignUpForm;