// ScoreTable.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// values passed from parent component
const ScoreTable = ({ allTimeScore, currentScore, upgradeLevel, onRefresh }) => {
  return (
    <View style={styles.scoreTable}>
      <View style={styles.scoreRow}>
        <View style={styles.scoreCell}>
          <Text style={styles.scoreText}>All time Score: {allTimeScore}</Text>
        </View>
        <View style={styles.scoreCell}>
          <Text style={styles.scoreText}>Current Score: {currentScore}</Text>
        </View>
        <View style={styles.scoreCell}>
          <Text style={styles.scoreText}>Click Power: {upgradeLevel}</Text>
        </View>
        {/** Reload Game Button (will just re render the Picture from MainPicComponent*/}
        <View style={styles.scoreCell}>
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
            <Text style={styles.scoreText}>Refresh Pic</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreTable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 25,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  scoreCell: {
    flex: 1,
    maxWidth: '33.33%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    textAlign: 'center',
  },
  reloadGame: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ScoreTable;
