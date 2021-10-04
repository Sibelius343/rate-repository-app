import React from "react";
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useHistory } from "react-router-native";
import RepositoryDescription from "./RepositoryDescription";
import RepositoryMetrics from "./RepositoryMetrics";
import CustomButton from "./CustomButton";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 5
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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

const RepositoryItem = ({ item: { fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, ownerAvatarUrl, id }, repoButton, onPress }) => {
  const history = useHistory();
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

  const clickForSingleView = repoButton
    ? null
    : () => history.push(`/repo/${id}`);

  return (
    <Pressable onPress={clickForSingleView}>
      <View style={styles.container} testID='repositoryItem' >
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
        {repoButton && <CustomButton
          onPress={onPress}
          text='Open in Github'
        />}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;