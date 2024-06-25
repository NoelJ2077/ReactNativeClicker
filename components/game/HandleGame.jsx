// HandleGame.jsx

export const handleClick = (score, setScore, setAllTimeScore, multiplier, setClickEffectVisible) => {
  for (let i = 0; i < multiplier; i++) {
    setTimeout(() => {
      setClickEffectVisible(true);
    }, i * 100);
    setTimeout(() => {
      setClickEffectVisible(false);
    }, i * 100 + 100);
  }

  setScore((prevScore) => prevScore + 1 * multiplier);
  setAllTimeScore((prevScore) => prevScore + 1 * multiplier);
};

export const buyUpgrade = (score, setScore, multiplier, setMultiplier, upgradeCost, setUpgradeCost) => {
  if (score >= upgradeCost) {
    setScore(score - upgradeCost);
    setMultiplier(multiplier + 1);
    setUpgradeCost(upgradeCost * 2);
  } else {
      window.alert("Not enough score to buy the upgrade!");
  }
};

export const handleShareScore = (currentUser, score, allTimeScore, alert) => {
  alert(`Not implemented yet, 
    but your Stats are: 
    
    Username: ${currentUser.displayName}
    Current Score: ${score}
    All Time Highscore: ${allTimeScore}
    Email: ${currentUser.email}
    
    Scores Stored Temporarily!`);
};
