import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const ButtonTable = ({ upgradeCost, score, buyUpgrade, handleShareScore }) => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity onPress={buyUpgrade} style={styles.upgradeButton}>
        <Text style={styles.upgradeText}>Upgrade Cost: {upgradeCost}</Text>
      </TouchableOpacity>

    <TouchableOpacity onPress={score} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Safe Score</Text>
    </TouchableOpacity>

      <TouchableOpacity onPress={handleShareScore} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share Score</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  upgradeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },

});

export default ButtonTable;
