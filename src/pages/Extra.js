import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Extra = () => {
  useEffect(() => {
    console.log('hello there =>');
  }, []);

  return (
    <View style={styles.container}>
      <Text>Extra</Text>
    </View>
  );
};

export default Extra;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
