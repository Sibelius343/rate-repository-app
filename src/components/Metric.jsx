import React from "react";
import { View } from "react-native";
import Text from "./Text";

const Metric = ({ value, label, testID }) => {
  return (
    <View>
      <Text fontWeight='bold' testID={testID}>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default Metric;