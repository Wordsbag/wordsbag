import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Splash = ({navigation}) => {
  const goToHome = () => {
    console.log('goToHome');
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
      <TouchableOpacity onPress={goToHome} style={styles.btnGo}>
        <Text style={styles.btnGoText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  btnGo: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
  },
  btnGoText: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
