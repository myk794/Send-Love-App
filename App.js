import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Image
        source={require('./assets/background.png')}
        style={styles.background}
        resizeMode="contain"
      />
      <View style={styles.logoText}>
        <Image source={require('./assets/sendLoveText.png')} />
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Your Love Name</Text>
        <Text style={styles.incomingLove}>162</Text>
      </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  background: {
   position: 'absolute', 
   width: '100%',
   alignSelf: 'center',
   marginTop: 150,

  },
  content: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  text: {
    color: '#595959',
    fontSize: 22,
    fontWeight: 'light',
    fontFamily: 'notoserif',
  },
  incomingLove:{
    color: "#595959",
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 20,
  },
  logoText: {
    alignItems: 'center',
    width: '100%',
  },
});
