import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tabContent: {
    color: 'white',
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.fontWeightBold,
    padding: 7
  }
});

const AppBarTab = ({ text, route, ...props }) => {
  return (
    <Pressable>
      <Link to={route}>
        <Text style={styles.tabContent} onPress={props.onClick}>
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;