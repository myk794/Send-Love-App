import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity, Modal } from 'react-native';
import { auth, signInAnonymously, onAuthStateChanged } from './firebase/firebase';
import { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import Loading from './components/Loading';


const Stack = createNativeStackNavigator();
export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator >
       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
