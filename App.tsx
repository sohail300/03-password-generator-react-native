/* eslint-disable prettier/prettier */
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Body from './components/Body';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const navTheme = DefaultTheme;
navTheme.colors.background = '#fff';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
      <NavigationContainer theme={navTheme}>
        <Body />
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
