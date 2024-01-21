/* eslint-disable prettier/prettier */
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Body from './components/Body';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Body />
      </ScrollView>
    </SafeAreaView>
  );
}
