import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/Main';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { Provider as PaperProvider } from 'react-native-paper';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log(Constants.manifest);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}