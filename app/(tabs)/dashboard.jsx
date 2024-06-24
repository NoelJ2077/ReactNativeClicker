import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Animated, Dimensions } from 'react-native';
import LoginPage from '../../components/forms/LoginPage';
import RegisterPage from '../../components/forms/RegisterPage';
import { auth } from '../../components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import * as Clipboard from 'expo-clipboard'; // can't import only clipboard => error
import ScoreTable from '@/components/game/ScoreTable';
import MainPicComponent from '@/components/game/MainPic';
import mainPic from '@/assets/images/cookieMain.png';
import BtnTable from '@/components/game/BtnTable'; 
import ClickEffect from '@/components/game/ClickEffect';

export default function CookieClicker() {
  const [currentUID, setCurrentUID] = useState(null); // firestore usage only
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  // game stuff
  const [score, setScore] = useState(0);
  const [allTimeScore, setAllTimeScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(25);

  const [clickEffectVisible, setClickEffectVisible] = useState(false);
  const containerDimensions = { width: containerWidth, height: containerHeight };

  // click event handler
  const handleClick = (e) => {
    setClickEffectVisible(true);
    setTimeout(() => {
      setClickEffectVisible(false);
    }, 100);

    setScore((prevScore) => {
      const newScore = prevScore + 1 * multiplier;
      return newScore;
    });

    // all time score is always + the current score
    setAllTimeScore((prevScore) => {
      const newScore = prevScore + 1 * multiplier;
      return newScore;
    });
  };

  useEffect(() => { // listen for auth state changes
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

  // switch between login and register pages
  const handleSwitchPage = () => {
    setShowLoginPage(!showLoginPage);
  };

  // get container dimensions
  const onContainerLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerWidth(width);
    setContainerHeight(height);
  };

  const buyUpgrade = () => {
    if (score >= upgradeCost) {
      setScore(score - upgradeCost);
      setMultiplier(multiplier + 1);
      setUpgradeCost(upgradeCost * 2);
    } else {
      alert('Not enough score to buy upgrade');
    }
  };

  const handleShareScore = async () => {
    alert(`Not implemented yet, 
    but your Stats are: 
    
    Username: ${currentUser.displayName}
    Current Score: ${score}
    All Time Highscore: ${allTimeScore}
    Email: ${currentUser.email}
    
    Scores Stored Temporarily!`);
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        {showLoginPage ? (
          <LoginPage onLogin={setCurrentUser} />
        ) : (
          <RegisterPage onRegister={setCurrentUser} />
        )}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSwitchPage}>
          <Text style={[styles.text, styles.buttonText]}>
            {showLoginPage ? "Go to Register" : "Go to Login"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>Welcome, {currentUser.displayName}</Text>
        <TouchableOpacity onPress={() => { Clipboard.setString(currentUser.email); }}>
          <Text style={styles.navbarText}>Email: {currentUser.email.slice(0, 3)}...{currentUser.email.slice(-3)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          auth.signOut();
          Alert.alert("Logged out successfully!");
        }}>
          <Text style={styles.navbarText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* ScoreTable component with passed args.*/}
      <ScoreTable allTimeScore={allTimeScore} currentScore={score} upgradeLevel={multiplier} />

      <View style={styles.innerContainer} onLayout={onContainerLayout}>
        <View style={styles.header}>
          <MainPicComponent source={mainPic} containerWidth={containerDimensions.width} containerHeight={containerDimensions.height} onPress={handleClick} />
        </View>
        {/* Platzieren Sie den AnimatedShiba hier, um sicherzustellen, dass er innerhalb des innerContainer angezeigt wird */}
        <ClickEffect isVisible={clickEffectVisible} buttonDimensions={containerDimensions} />
      </View>

      {/* BtnTable (cookie) component with passed args. */}
      <BtnTable
        upgradeCost={upgradeCost}
        buyUpgrade={buyUpgrade}
        safeScore={score} // safe to firestore
        handleShareScore={handleShareScore}
      />
    </View>
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
    zIndex: 10, // Ensure it's above other components
  },
  clickEffectImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
