import React from "react";
import RepositoryItem from "./RepositoryItem";
import * as WebBrowser from 'expo-web-browser';
import { useParams } from 'react-router-native';
import useRepository from "../hooks/useRepository";
import { FlatList, View, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useRepository({ id, first: 5 });
  console.log('data from single repo', data);
  console.log('single repo id', id);

  if (loading) {
    return null;
  }

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map(e => e.node)
    : [];

  const onGithubPress = () => {
    WebBrowser.openBrowserAsync(data.repository.url);
  };

  return (
    <FlatList
    data={reviewNodes}
    renderItem={({ item }) => (
      <ReviewItem review={item} heading={item.user.username} />
    )}
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={({ id }) => id}
    ListHeaderComponent={() => (
      <View>
        <RepositoryItem item={data.repository} repoButton onPress={onGithubPress} />
        <View style={styles.separator} />
      </View>
    )}
    onEndReachedThreshold={0.1}
    onEndReached={fetchMore}
    />
  );
};

export default SingleRepository;