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
      <Metric value={stars} label='Stars' />
      <Metric value={forks} label='Forks' />
      <Metric value={reviews} label='Reviews' />
      <Metric value={rating} label='Rating' />
    </View>
  );
};

export default RepositoryMetrics;