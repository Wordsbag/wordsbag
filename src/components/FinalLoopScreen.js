import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Background from '../assets/images/confetti.jpeg';
import Badge from '../assets/images/finalBadge.png';
import {goIntro} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';
const FinalLoopScreen = () => {
  const handleNextBtnEvent = async () => {
    // dispatch(goIntro());
    console.warn('Go Now To The Random Test');
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.scoreCircle}>
        <View style={styles.scoreCircleChild}>
          <Text style={styles.scoreText}>4/4</Text>
        </View>
      </View>
      <View style={styles.image}>
        <Image
          source={Badge}
          style={{width: '100%', height: '100%'}}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>

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

export default FinalLoopScreen;

const styles = StyleSheet.create({
  image: {flex: 2, width: '100%'},
  scoreCircleChild: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#FFF0C1',
    borderWidth: 10,
    borderColor: '#F79823',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCircle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {color: '#971C0A', fontSize: 35, fontWeight: '600'},
  btnNext: {
    backgroundColor: '#2AC02A',
    padding: 15,
    width: '60%',
    borderRadius: 20,
  },
  btnNextText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
