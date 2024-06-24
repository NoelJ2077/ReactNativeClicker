// MainPic.jsx
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const MainPicComponent = ({ source, containerWidth, containerHeight, onPress }) => {
  const [CCeffect] = useState(new Animated.Value(1));

  const handleClick = () => {
    Animated.spring(CCeffect, {
      toValue: 0.7,
      friction: 2,
      useNativeDriver: true,
      duration: 20,
    }).start(() => {
      Animated.spring(CCeffect, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
        duration: 20,
      }).start();
    });
  
    onPress();
  }

  const imageSize = {
    width: containerWidth * 0.9,
    height: containerHeight * 0.9,
  };

  return (
    <TouchableOpacity onPress={handleClick}>
      <Animated.Image source={source} style={[styles.mainPic, imageSize, { transform: [{ scale: CCeffect }] }]} resizeMethod="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainPic: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'purple',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default MainPicComponent;
