import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/Main';

export default function App() {
  console.log('test log');
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}