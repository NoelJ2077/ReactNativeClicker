import { Linking, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Cookie Clicker</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.sectionTitle}>Link to my GitHub repository:</Text>
      <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/NoelJ2077/ExpoGo_CookieClicker')}>
        GitHub Project 
      </Text>
      <Text style={styles.explanation}>The GNU General Public License (GPL) is a free, copyleft license for software and other kinds of works. The GPL grants users the freedom to run, study, share, and modify the software.</Text>
      <Text style={styles.sectionTitle}>Software Dependencies and Licensing:</Text>
      <Text style={styles.explanation}>
        This project relies on several open-source libraries that are licensed under the GPL or similar licenses. These dependencies are crucial for the functionality and development of Cookie Clicker. By adhering to the GPL, we ensure that the rights of all contributors are respected, and the software remains accessible and modifiable by the community.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 0, 40, 0.9)', // Dark purple
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd', 
  },
  sectionTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 20, 
    marginBottom: 10, 
  },
  link: {
    color: 'rgba(0, 122, 255, 1)',
    textDecorationLine: 'underline',
    fontSize: 16,
    margin: 10,
  },
  explanation: {
    fontSize: 16, 
    textAlign: 'justify', 
    marginHorizontal: 20,
    lineHeight: 22,
  }
});
