import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text as ThemedText, View as ThemedView } from '@/components/Themed';

export default function TabOneScreen() {
  // some features
  const features = [
    '- firebase user management',
    '- temporary safe-score',
    '- Accelerometer implementation => 1.5G',
    '- refresh IMG',
    '- onClick Click Effects',
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Features:</ThemedText>
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        {features.map((feature, index) => (
          <ThemedText key={index} style={styles.featureItem}>{feature}</ThemedText>
        ))}
      </ScrollView>
      <ThemedView style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx"/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(10, 0, 40, 0.9)', // Dark purple
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 25,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

