// shakerTest.jsx 
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function ShakeDetector({ onShake }) {
  useEffect(() => {
    const threshold = 1.5;
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

      if (totalAcceleration > threshold) {
        // show alert dialog
        Alert.alert(
          'Logout',
          'Do you really want to log out?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancelled logout'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => onShake() },
          ],
          { cancelable: false },
        );
      }
    });

    Accelerometer.setUpdateInterval(500);

    return () => {
      subscription.remove();
    };
  }, [onShake]);

  return null;
}