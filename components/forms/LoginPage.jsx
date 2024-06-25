// LoginPage.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { auth } from '@/components/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in: ', user);
      onLogin(user);
    } catch (error) {
      console.error('Error signing in: ', error);
      Alert.alert('Error signing in', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>firebase login CC Clicker</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="white"
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 30, 40, 0.9)',
    padding: 16,
    borderRadius: 80,
    marginBottom: 20,
    marginBottom: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: 'white',
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
    borderRadius: 8,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
