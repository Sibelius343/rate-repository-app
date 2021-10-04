import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Text from "./Text";
import { format } from 'date-fns';
import theme from "../theme";
import CustomButton from "./CustomButton";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rating: {
    height: 45,
    width: 45,
    borderRadius: (45/2),
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
  },
  text: {
    flexWrap: 'wrap'
  },
  buttons: {
    flex: 1
  },
  description: {
    flex: 1
  }
});

const ReviewItem = ({ review: { id, text, rating, createdAt }, heading, refetch, url }) => {
  const [mutate] = useMutation(DELETE_REVIEW);
  
  const deleteAlert = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: deleteReview }
      ]
    );
  };

  console.log('url:', url);
  
  const repoPress = () => {
    WebBrowser.openBrowserAsync(url);
  };
  const deleteReview = async () => {
    try {
      await mutate({ variables: { id: id }});
      await refetch();
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.rating}>
          <Text fontWeight='bold' color='primary' >
            {rating}
          </Text>
        </View>
        <View style={styles.description}>
          <Text fontWeight='bold' fontSize='subHeading'>
            {heading}
          </Text>
          <Text color='textSecondary'>
            {format(new Date(createdAt), 'MM.dd.yyyy')}
          </Text>
          <Text style={styles.text}>
            {text}
          </Text>
        </View>
      </View>
      {refetch &&
        <View style={styles.buttonContainer}>
          <CustomButton text='View repository' onPress={repoPress} style={styles.buttons} />
          <CustomButton text='Delete review' onPress={deleteAlert} style={[styles.buttons, {backgroundColor: '#f54842'}]} />
        </View>}
    </View>
  );
};

export default ReviewItem;