import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Circle = ({x, y, size, index, onClick, remove, circles}) => {
  var radius = size/2
  // var timeout = setTimeout(()=>{
  //   remove(circles, index)
  // }, 3000)
    const circleStyle = {
        position: 'absolute',
        borderRadius: radius,
        backgroundColor: `red`,
        height: size,
        width: size,
        left: x,
        top: y,
    };
    // useEffect(()=>{
    //   timeout
    //   return timeout

    // }, [remove]

    // )
    return (
        <TouchableOpacity
            style={
              x ? circleStyle : {
                backgroundColor: `green`,
                borderRadius: 20,
                height: 40,
                width: 40,
                left: 10,
                top: 10
              }
            }
            onClick={() => onClick(index)}
            onPress={() => onClick(index)}
        />
    );
};

export default Circle;