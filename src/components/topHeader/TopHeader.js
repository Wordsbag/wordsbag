import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
import Boy from '../../assets/boy.png';
const TopHeader = () => {
  return (
    <View style={styles.profileBar}>
      {/* <Text style={styles.profileBadge}>P</Text> */}
      <View style={styles.profileBadge}>
        <Image style={styles.profileBadgeImg} source={Boy} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: '#fff',
          width: 36,
          height: 36,
          borderRadius: 18,
        }}>
        <Ionicons
          name="notifications-outline"
          style={{
            color: COLORS.topNavIcon,
            fontSize: 22,
          }}
        />
      </View>
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
    // paddingHorizontal: 20,
  },
  profileBadgeImg: {height: 30, width: 30},

  profileBadge: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.topNavIcon,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
