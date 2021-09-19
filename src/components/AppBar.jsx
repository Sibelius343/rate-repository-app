import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    height: theme.height.appBarHeight,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  // ...
});

const AppBar = ({ children }) => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>{children}</ScrollView>
  </View>
  );
};

export default AppBar;