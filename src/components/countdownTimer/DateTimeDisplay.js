import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const DateTimeDisplay = ({value, type, isDanger}) => {
  return (
    <View
      //   style={isDanger ? [styles.countdown, styles.danger] : styles.countdown}>
      style={styles.timeWrapper}>
      <Text style={styles.timeStyle}>{value}</Text>
      <Text style={styles.timeStyle}>{type !== 'Seconds' ? ':' : null}</Text>
    </View>
  );
};

export default DateTimeDisplay;
const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection: 'row',
  },
  timeStyle: {
    fontSize: 24,
    color: '#fff',
    paddingHorizontal: 5,
  },
});
