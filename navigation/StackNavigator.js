import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
      return(
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel:"Accueil", 
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon: ({focused}) => focused ? (
                <Entypo name="home" size={24} color="#078ECB" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Panier"
            component={HomeScreen}
            options={{
              tabBarLabel:"Panier",
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon: ({focused}) => focused ? (
                <Ionicons name="cart" size={24} color="#078ECB" />
              ) : (
                <Ionicons name="cart" size={24} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfileScreen}
            options={{
              tabBarLabel:"Profil",
              tabBarLabelStyle:{color:"#078ECB"},
              headerShown:false,
              tabBarIcon: ({focused}) => focused ? (
                <Ionicons name="person" size={24} color="#078ECB" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      )
    }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=''>
        <Stack.Screen name="Login" options={{headerShown:false}} component={LoginScreen} />
        <Stack.Screen name="Register" options={{headerShown:false}} component={RegisterScreen} />
        <Stack.Screen name="Main" options={{headerShown:false}} component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})