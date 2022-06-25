import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TopHeader = () => {
  return (
    <View style={styles.profileBar}>
      <Text style={styles.profileBadge}>P</Text>
      <Ionicons
        name="notifications"
        style={{
          color: '#0077b6',
          fontSize: 25,
        }}
      />
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  profileBar: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  profileBadge: {
    height: 30,
    width: 30,
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 20,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
  },
});
