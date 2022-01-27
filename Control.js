import React, {useEffect, useCallback} from 'react'
import {AppState, Button, StyleSheet, Text, View } from 'react-native';
import {useState} from 'react'


const Control = ({ setControlState, controlState, onReset }) => {
    const {isRunning} = controlState;

    const togglePause = () => {
        setControlState((oldState) => {
            return {...oldState, isRunning: !oldState.isRunning};
        });
    }

    const onStart = useCallback(() => {
        setControlState({...controlState, isRunning: true});
    },
    [
        controlState,
        setControlState,
    ]);

    useEffect(() => {
      AppState.addEventListener("change", () => {
          setControlState(oldState => {
              return {...oldState, isRunning: false};
          });
      });
      return () => AppState.removeEventListener("change");
  }, [setControlState]);

  var running = (<Button onPress={togglePause}
  title="PAUSE"
  />)
  var notRunning = (<Button onPress={onStart}
  title="START"
  />)
  return (
    <View style={{
      justifyContent: 'flex-end',
      // alignItems: 'flex-end',
    }}>
      <View style={{
        borderRadius: 10 ,
        alignSelf:'flex-end',
        flexDirection:'row',
        // flexWrap:'wrap'
        }}>
        {isRunning ? running : notRunning}
        <Button onPress={onReset}
        title="Clear"/>
        </View>
    </View>
  )
}

export default React.memo(Control)