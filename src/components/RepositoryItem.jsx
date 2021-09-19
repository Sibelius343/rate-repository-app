import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import RepositoryDescription from "./RepositoryDescription";
import RepositoryMetrics from "./RepositoryMetrics";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 3,
    margin: 5
  },
  metrics: {
    paddingBottom: 10
  }
});

const RepositoryItem = ({ item: { fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl }}) => {
  const parseCount = (number) => {
    if (number < 1000) {
      return number;
    }
    const count = (number / 1000).toFixed(1);
    if ((Number(count) * 10) % 10 === 0) {
      return `${(number / 1000).toFixed(0)}k`;
    }
    return `${count}k`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.image}
          source={{
            uri: ownerAvatarUrl
          }}
        />
        <RepositoryDescription
          fullName={fullName}
          description={description}
          language={language}
        />
      </View>
      <RepositoryMetrics
        stars={parseCount(stargazersCount)}
        forks={parseCount(forksCount)}
        reviews={parseCount(reviewCount)}
        rating={ratingAverage}
        style={styles.metrics}
      />
    </View>
  );
};

export default RepositoryItem;