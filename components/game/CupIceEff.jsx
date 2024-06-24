// extraEffect.jsx
import React from 'react';
import { View, Image } from 'react-native';

const OneKEffect = ({ isVisible, width, height }) => {
  const cookieWidth = 60; 
  const cookieHeight = cookieWidth;
  const margin = 10;

  const randomPosition = () => {
  const randomTop = Math.floor(Math.random() * (height - cookieHeight - margin));
  const randomLeft = Math.floor(Math.random() * (width - cookieWidth - margin));
  
  const isValidTop = randomTop >= 0;
  const isValidLeft = randomLeft >= 0;

  if (!isValidTop ||!isValidLeft) {
    return { left: 0, top: 0 };
  }

  return { left: randomLeft, top: randomTop };
};

  return isVisible? (
    <View style={{ position: 'absolute' }}>
      <Image
        source={require('../assets/images/1kEff.png')}
        style={{
          width: cookieWidth,
          height: cookieHeight,
          position: 'absolute',
         ...randomPosition(),
        }}
      />
    </View>
  ) : null;
};

export default OneKEffect;
