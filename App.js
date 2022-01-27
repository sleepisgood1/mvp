import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Game from './game/Game.js';
import {styles} from './Styles.js'
import Control from './Control.js'
export default function App() {
  return (

      <View style={styles.container}>
        <Text>Aim Helper</Text>
        <Game />
        <StatusBar style="auto" />
      </View>
  );
}
