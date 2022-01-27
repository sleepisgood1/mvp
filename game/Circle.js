import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Circle = ({x, y, size, index, onClick}) => {
  var radius = size/2
    const circleStyle = {
        borderRadius: `${radius}px`,
        backgroundColor: `red`,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
    };

    return (
        <View
            style={circleStyle}
            onClick={() => onClick(index)}
        />
    );
};

export default Circle;