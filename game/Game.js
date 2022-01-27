import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { circlesState, scoreState, controlOptions } from './atomconfig.js';
import Control from './../Control.js';
import Circle from './Circle.js';

const Game = () => {
  const [circles, updateCircles] = useRecoilState(circlesState);
  const [controlState, setControlState] = useRecoilState(controlOptions);
  const [score, setScore] = useRecoilState(scoreState);
  const requestRef = useRef();
  const intervalRef = useRef();
  const screenRef = useRef();
  const CREATE_INTERVAL = 1000;

  const createCircle = () => {
    var maxWidth = Dimensions.get('window').width
    var maxHeight = Dimensions.get('window').length
    const size = Math.floor(Math.random() * 100)
    var x = Math.floor(Math.random() * 100);
    var y = Math.floor(Math.random() * 100);
    return {
      size,
      x,
      y
    }
  }

  const removeCircle = (circles, index)=>{
    var newCircles = [...circles]
    newCircles.splice(index, 1)
    return newCircles
  }

  const makeCircle = useCallback(() => {
    updateCircles((oldCircles) => [...oldCircles, createCircle()]);
}, [updateCircles]);

  useEffect(() => {

    if (controlState.isRunning) {
        intervalRef.current = setInterval(makeCircle, CREATE_INTERVAL);
    } else {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      requestRef.current && cancelAnimationFrame(requestRef.current);
    }
  }, [controlState.isRunning, makeCircle])

  const reset = useCallback(() => {
    setControlState({...controlState, isRunning: false});
    updateCircles([]);
    setScore(0);
  }, [setControlState, setScore, updateCircles, controlState]);

  const onCircleClick = (index) => {
    setScore(score+1);
      updateCircles(removeCircle(circles, index));
  };

  return (
    <View>
      <View>
        <Text>Current Score: {score}</Text>
        <Control onReset={reset}/>
      </View>
      <View ref={screenRef}>
        {
        circles.map((circle, index)=>{

          return (
            <Circle
            key={'circle'+ index}
            {...circle}
            index={index}
            onClick={onCircleClick}/>
          )
        })
        }
      </View>
    </View>
  );
}

export default Game;