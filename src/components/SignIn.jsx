import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import Text from './Text';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'blue',
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

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Username is required'),
  password: Yup
    .string()
    .required('Password is required')
});

const onSubmit = (values) => {
  console.log('form submitted', values);
};

const SignIn = () => {
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
          />
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} fontWeight='bold'>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;