import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Background from '../assets/images/confetti.jpeg';
import Badge from '../assets/images/badge.png';
import {goIntro} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';
const BetweenThree = () => {
  const handleNextBtnEvent = async () => {
    dispatch(goIntro());
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImageStyle}
        source={Background}
        resizeMode={'cover'}
      />
      <Image source={Badge} />
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <TouchableOpacity style={styles.btnNext} onPress={handleNextBtnEvent}>
          <Text style={styles.btnNextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BetweenThree;

const styles = StyleSheet.create({
  btnNext: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 20,
  },
  btnNextText: {
    textAlign: 'center',
    color: '#27175D',
    fontSize: 20,
  },
  bgImageStyle: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
