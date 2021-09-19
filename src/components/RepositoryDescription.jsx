import React from "react";
import { View, StyleSheet } from "react-native";
import Language from "./Language";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    margin: 5,
    flex: 1
  },
  item: {
    flexWrap: 'wrap',
    margin: 1
  }
});

const RepositoryDescription = ({ fullName, description, language }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.item} fontWeight='bold' fontSize='subHeading'>{fullName}</Text>
      <Text style={[styles.item, {marginBottom: 3}]} color='textSecondary'>{description}</Text>
      <Language style={styles.item} language={language} />
    </View>
  );
};

export default RepositoryDescription;