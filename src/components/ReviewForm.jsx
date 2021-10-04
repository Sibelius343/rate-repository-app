import React from "react";
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import CustomButton from "./CustomButton";
import { useHistory } from 'react-router-native';
import useCreateReview from "../hooks/useCreateReview";

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: 0,
  text: ''
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white'
  }
});

const validationSchema = Yup.object().shape({
  repositoryOwner: Yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: Yup
    .string()
    .required('Repository name is required'),
  rating: Yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: Yup
    .string()
});

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='repositoryOwner'
            placeholder='Repo Owner'
            testID='repositoryOwner'
          />
          <FormikTextInput
            name='repositoryName'
            placeholder='Repo Name'
            testID='repositoryName'
          />
          <FormikTextInput
            name='rating'
            placeholder='Rating between 0 and 100'
            testID='rating'
            keyboardType='numeric'
          />
          <FormikTextInput
            name='text'
            placeholder='Review'
            testID='review'
            multiline
          />
          <CustomButton onPress={handleSubmit} text='Create a review' />
        </View>
      )}
    </Formik>
  );
};

const ReviewForm = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const handleSubmit = async (values) => {
    console.log(values);
    const data = await createReview(values);
    console.log('should be id', data.repositoryId);
    history.push(`/repo/${data.repositoryId}`);
  };

  return (
    <ReviewFormContainer onSubmit={handleSubmit} />
  );
};

export default ReviewForm;