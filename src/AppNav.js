import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Loop from './Loop/Loop';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialeRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Loop" component={Loop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
