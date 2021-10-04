import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { user, loading, fetchMore, refetch } = useAuthorizedUser({ includeReviews: true, first: 5 });

  if (loading) {
    return null;
  }

  const reviews = user.reviews
    ? user.reviews.edges.map(e => e.node)
    : [];

  console.log('user reviews', reviews);
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} heading={item.repository.fullName} refetch={refetch} url={item.repository.url} />
      )}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
    />
  );
};

export default UserReviews;