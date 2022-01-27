import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { RecoilRoot } from "recoil";
import Game from './game/Game.js';
import {styles} from './Styles.js'
import Control from './Control.js'
// import Control from './Control.js';
export default function App() {
  return (
    <RecoilRoot>
      <View style={styles.container}>
        {/* <Control/> */}
        <Game />
        <Text>Working on app</Text>
        <StatusBar style="auto" />
      </View>
    </RecoilRoot>
  );
}
