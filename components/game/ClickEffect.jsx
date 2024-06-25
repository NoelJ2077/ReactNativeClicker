// ClickEffect.jsx
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

// ClickEffect component (if cookie is clicked)
const ClickEffect = ({ isVisible, buttonDimensions }) => {
  const [opacity] = useState(new Animated.Value(isVisible? 1 : 0));
  const [shibaPosition, setShibaPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible) {
      const { width: buttonWidth, height: buttonHeight } = buttonDimensions;
      const maxTop = buttonHeight - 70;
      const maxLeft = buttonWidth - 70;
      const randomTop = Math.floor(Math.random() * maxTop);
      const randomLeft = Math.floor(Math.random() * maxLeft);
      setShibaPosition({ top: randomTop, left: randomLeft });
    }
  }, [isVisible, buttonDimensions]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isVisible? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, opacity]);

  // Calculate the dimensions of the picture
  const pictureWidth = buttonDimensions.width;
  const pictureHeight = buttonDimensions.height;

  return (
    <View style={[styles.container, { top: shibaPosition.top, left: shibaPosition.left }]}>
      <Animated.Image
        source={require('../../assets/images/CookieEff.jpg')}
        style={[styles.image, { opacity: opacity }]}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    zIndex: -1,
    borderRadius: 35,
  },
});

export default ClickEffect;
