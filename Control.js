import React, {useEffect, useCallback} from 'react'
import { useRecoilState } from 'recoil';
import {AppState, Button, StyleSheet, Text, View } from 'react-native';
import { controlOptions } from './game/atomconfig.js';

// const appState = useRef(AppState.currentState)
// const [appStateVisible, setAppStateVisible] = useState(appState.current)

const Control = ({ onReset }) => {
    const [controlState, setControlState] = useRecoilState(controlOptions);
    const {isRunning} = controlState;

    const togglePause = () => {
        setControlState((oldState) => {
          console.log(oldState)
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
    <View>
        {isRunning ? running : notRunning}
        <Button onPress={onReset}
        title="Clear"/>
    </View>
  )
}

export default React.memo(Control)