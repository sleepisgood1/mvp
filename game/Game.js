import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { StyleSheet, Text, View } from 'react-native';
import { circleState, scoreState } from './atom';
import { VISIBLE_TIME, SPAWN_INTERVAL } from './constants';

const Game = () => {
  const [circle, updateCircle] = useRecoilState(circleState);
  const [score, setScore] = useRecoilState(scoreState);
  return (
    <View>
      
    </View>
  )
}