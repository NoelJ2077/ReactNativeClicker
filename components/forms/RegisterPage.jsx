// RegisterPage.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { auth, db } from '@/components/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, 'users', user.uid), { username, email });
      console.log('User signed up and profile updated: ', user);
      onRegister(user);
    } catch (error) {
      console.error('Error signing up: ', error);
      Alert.alert('Error signing up', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>firebase sign-up CC Clicker</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="white"
      />
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
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
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
