import React from "react";
import { View } from "react-native";
import Text from "./Text";

const Metric = ({ value, label }) => {
  return (
    <View>
      <Text fontWeight='bold'>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default Metric;