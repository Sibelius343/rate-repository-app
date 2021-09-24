import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';
import AppBarTab from './components/AppBarTab';
import RepositoryList from './components/RepositoryList';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './components/SignIn';
import theme from './theme';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from './graphql/queries';
import useAuthStorage from './hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  const { data, loading } = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const logOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  console.log(data);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppBar>
        <AppBarTab text='Repositories' route='/' />
        {data.authorizedUser
          ? <AppBarTab text='Sign Out' route='/' onClick={logOut} />  
          : <AppBarTab text='Sign In' route='/signin' />}
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