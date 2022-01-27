import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Control from './../Control.js';
import Circle from './Circle.js';

const Game = () => {
  const [circles, updateCircles] = useState([]);
  const [controlState, setControlState] = useState({isRunning: false});
  const [score, setScore] = useState(0);
  const requestRef = useRef();
  const intervalRef = useRef();
  const screenRef = useRef();
  const removeRef = useRef()
  // const CREATE_INTERVAL = 1000;

  const createCircle = () => {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    var maxWidth = Dimensions.get('window').width
    // console.log('width', maxWidth)
    var maxHeight = Dimensions.get('window').height
    // console.log('height', maxHeight)
    var size = getRandomInt(30, Math.ceil(maxWidth/30))
    var x = getRandomInt(0, maxWidth-200)
    var y = getRandomInt(0, Math.abs(maxHeight)-270)
    // console.log(size)
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
  const dissapearCircle = useCallback(()=>{
    updateCircles((oldCircles)=>removeCircle(oldCircles, 0))}, [updateCircles])


  const makeCircle = useCallback(() => {
    updateCircles((oldCircles) => [...oldCircles, createCircle()]);
}, [updateCircles]);

  useEffect(() => {

    if (controlState.isRunning) {
        intervalRef.current = setInterval(makeCircle, 500);
        removeRef.current = setInterval(dissapearCircle, 4000)
    } else {
      intervalRef.current && clearInterval(intervalRef.current);
      removeRef.current && clearInterval(removeRef.current)
      // requestRef.current && cancelAnimationFrame(requestRef.current);
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
      removeRef.current && clearInterval(removeRef.current)
      // requestRef.current && cancelAnimationFrame(requestRef.current);
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
      <View style={{
      // flex: 1,
      // position: 'absolute', top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      // alignSelf: 'flex-end',
      // flexDirection: 'row',
      // flexWrap: 'wrap'
    }}>
        <Text>Current Score: {score}</Text>
        <Control
        setControlState={setControlState}
        controlState={controlState}
        onReset={reset}/>
      </View>
      <View ref={screenRef}>
        {
        circles.map((circle, index)=>{
        //   const x = (
        //     screenRef.current.offsetWidth - circle.size
        // ) * circle.x / 100
        //   const y = (
        //     screenRef.current.offsetHeight + circle.size
        // ) * circle.y / 100

          return (
            <Circle
            key={'circle'+ index}
            y={circle.y}
            size={circle.size}
            x={circle.x}
            index={index}
            onClick={onCircleClick}
            onPress={onCircleClick}
            // remove={removeCircle}
            // circles={circles}
            />
          )
        })
        }
      </View>
    </View>
  );
}

export default Game;