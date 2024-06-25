// dashboard.jsx
// Module imports
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Animated, Dimensions } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import * as Clipboard from 'expo-clipboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// firbsase config
import { auth } from '@/components/firebaseConfig';
// Game imports 
import LoginPage from '@/components/forms/LoginPage';
import RegisterPage from '@/components/forms/RegisterPage';
import ScoreTable from '@/components/game/ScoreTable';
import MainPicComponent from '@/components/game/MainPic';
import mainPic from '@/assets/images/cookieMain.png';
import BtnTable from '@/components/game/BtnTable';
import ClickEffect from '@/components/game/ClickEffect';
import ShakeDetector from '@/components/game/shakerTest';
import { handleClick, buyUpgrade, handleShareScore } from '@/components/game/HandleGame';

export default function CookieClicker() {
  const [currentUID, setCurrentUID] = useState(null); // future usage for database firestore
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [score, setScore] = useState(0);
  const [allTimeScore, setAllTimeScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(25);
  const [clickEffectVisible, setClickEffectVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const containerDimensions = { width: containerWidth, height: containerHeight };
  
  // useEffect for the ShakeDetector
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setCurrentUID(user.uid);
      } else {
        setCurrentUser(null);
        setCurrentUID(null);
      }
    });
    return unsubscribe;
  }, []);

  // called by the ShakeDetector
  const handleScoreShare = () => {
    handleShareScore(currentUser, score, allTimeScore, window.alert);
  };

  // refresh button for the main picture
  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    alert('Picture refreshed!');
  };

  // get the dimensions of the container for the main picture
  const onContainerLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  };

  // Logout function
  const handleLogout = () => {
    auth.signOut();
    Alert.alert("Logged out successfully!");
  };

  // firebase delete account
  const deleteAccount = () => {
    currentUser.delete().then(() => {
      Alert.alert("Account deleted successfully!");
      auth.signOut();
    }).catch((error) => {
      Alert.alert("Error deleting account: " + error.message);
    });
  };

  // Copy email to clipboard
  const handleClipboard = () => {
    Clipboard.setString(currentUser.email);
    Alert.alert('Email: ' + currentUser.email + ' copied to clipboard!');
  };

  // Upgrade function
  const handleUpgrade = () => {
    buyUpgrade(score, setScore, multiplier, setMultiplier, upgradeCost, setUpgradeCost);
  };

  // Switch between Login and Register Page
  const handleSwitchPage = () => {
    setShowLoginPage((prev) => !prev);
  };

  // Login Page or Register Page if no user is logged in
  if (!currentUser) {
    return (
      <View style={styles.container}>
        {showLoginPage ? (
          <>
            <LoginPage onLogin={setCurrentUser} />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSwitchPage}>
              <Text style={[styles.text, styles.buttonText]}>
                Go to Register
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <RegisterPage onRegister={setCurrentUser} />
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSwitchPage}>
              <Text style={[styles.text, styles.buttonText]}>
                Go to Login
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  // Game
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* Navbar with user info and logout button */}
        <View style={styles.navbar}>
          <Text style={styles.navbarText}>Welcome, {currentUser.displayName}</Text>
          <TouchableOpacity onPress={handleClipboard}>
            <Text style={styles.navbarText}>Email: {currentUser.email.slice(0, 3)}...{currentUser.email.slice(-3)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.navbarText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Top Score Table Bar */}
        <ScoreTable
          allTimeScore={allTimeScore}
          currentScore={score}
          upgradeLevel={multiplier}
          upgradeCost={upgradeCost}
          onRefresh={handleRefresh}
        />
        
        {/* Main Game */}
        <View style={styles.innerContainer} onLayout={onContainerLayout}>
          <View style={styles.header}>
            <MainPicComponent
              key={refreshKey} 
              source={mainPic} 
              containerWidth={containerDimensions.width} 
              containerHeight={containerDimensions.height} 
              onPress={() => handleClick(score, setScore, setAllTimeScore, multiplier, setClickEffectVisible)} 
            />
          </View>
          {/* ClickEffect component */}
          <ClickEffect isVisible={clickEffectVisible} buttonDimensions={containerDimensions} />
        </View>

        {/* Bottom Bar with buttons */}
        <BtnTable
          upgradeCost={upgradeCost}
          buyUpgrade={handleUpgrade}
          safeScore={score}
          handleShareScore={handleScoreShare}
        />

        {/* ShakeDetector using => Accelerometer from expo-sensors */}
        <ShakeDetector onShake={deleteAccount} />

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 0, 40, 0.9)',
    paddingTop: 25,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#2D2A4A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  navbarText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
  },
  GameElements: {
    fontSize: 18,
    color: 'white',
    margin: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    margin: 20,
  },
  upgradeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  upgradeText: {
    color: 'white',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
  },
  clickEffectContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  clickEffectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  clickable: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    bottom: 200,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  }
});
