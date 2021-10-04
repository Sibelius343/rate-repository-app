import React from "react";
import { View, StyleSheet } from "react-native";
import Metric from "./Metric";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

const RepositoryMetrics = ({ stars, forks, reviews, rating, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Metric value={stars} label='Stars' testID='stars' />
      <Metric value={forks} label='Forks' testID='forks' />
      <Metric value={reviews} label='Reviews' testID='reviews' />
      <Metric value={rating} label='Rating' testID='rating' />
    </View>
  );
};

export default RepositoryMetrics;