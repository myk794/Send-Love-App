import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, Button,TouchableOpacity } from 'react-native';

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
        <Text style={styles.yourLoveName}>Your Love Name</Text>
        <Text style={styles.incomingLove}>162</Text>
        <Text style={styles.textSmall}>sent loves today</Text>
      </View>
      <TouchableOpacity style={styles.sendLoveButton}>
        <Text style={styles.sendLoveButtonText}>SEND</Text>
      </TouchableOpacity>
     

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
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
  yourLoveName: {
    color: '#595959',
    fontSize: 22,
    fontWeight: 'light',
    fontFamily: 'notoserif',
  },
  incomingLove: {
    color: "#595959",
    fontSize: 80,
    lineHeight: 80,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 20,
  },
  textSmall: {
    color: '#595959',
    fontSize: 14,
    fontWeight: 'light',
    fontFamily: 'notoserif',
  },
  logoText: {
    alignSelf: 'center',
    marginTop: 10,
  },
  sendLoveButton:{
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fb2235",
    width: '40%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  sendLoveButtonText:{
    color: "#fb2235",
    fontWeight: 'regular',
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});
