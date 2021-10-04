import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from './components/AppBar';
import AppBarTab from './components/AppBarTab';
import RepositoryList from './components/RepositoryList';
import { Route, Switch, Redirect, useHistory } from 'react-router-native';
import SignIn from './components/SignIn';
import theme from './theme';
import { useQuery } from '@apollo/client';
import { AUTHORIZED_USER } from './graphql/queries';
import useAuthStorage from './hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import SingleRepository from './components/SingleRepository';
import ReviewForm from './components/ReviewForm';
import SignUpForm from './components/SignUpForm';
import UserReviews from './components/UserReviews';

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
  const history = useHistory();

  const logOut = () => {
    history.push('/');
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
        {data.authorizedUser && <AppBarTab text='Create a review' route='/createReview' />}
        {data.authorizedUser && <AppBarTab text='My reviews' route='/reviews' />}
        {data.authorizedUser
          ? <AppBarTab text='Sign Out' onClick={logOut} />  
          : <AppBarTab text='Sign In' route='/signin' />}
        {!data.authorizedUser && <AppBarTab text='Sign up' route='/signup' />}
      </AppBar>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repo/:id">
          <SingleRepository />
        </Route>
        <Route path="/createReview">
          <ReviewForm />
        </Route>
        <Route path="/reviews">
          <UserReviews />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;