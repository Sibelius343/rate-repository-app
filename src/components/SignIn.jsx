import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import CustomButton from './CustomButton';

const initialValues = {
  username: '',
  password: ''
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
    .required('Username is required'),
  password: Yup
    .string()
    .required('Password is required')
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values)}
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
            secureTextEntry
            testID='password'
          />
          <CustomButton text='Sign in' onPress={handleSubmit} testID='submit' />
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      history.push('/');
    } catch (e) {
      console.log('from onSubmit', e);
    }
  };
  
  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;