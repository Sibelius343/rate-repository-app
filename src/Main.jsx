import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';
import AppBarTab from './components/AppBarTab';
import RepositoryList from './components/RepositoryList';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './components/SignIn';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar>
        <AppBarTab text='Repositories' route='/' />
        <AppBarTab text='Sign In' route='/signin' />
      </AppBar>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;