import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants';

const mapState = ({loop}) => ({
  ourStep: loop.ourStep,
  globalStep: loop.globalStep,
  wordIndice: loop.myWordIndice,
});

const ProgressIndicator = () => {
  const {ourStep, globalStep, wordIndice} = useSelector(mapState);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(2);
  const [singleWordStep, setSingleWordStep] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(ourStep));
  const progressAnim = progress.interpolate({
    inputRange: [0, 4],
    outputRange: ['0%', '100%'],
  });

  // const handleNext = () => {
  //   setSingleWordStep(singleWordStep + 1);
  // };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: ourStep,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [ourStep]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.progressWrapper}>
        <View style={styles.progBarExternStyle}>
          <Animated.View
            style={[
              styles.progBarInternStyle,
              {
                width: progressAnim,
              },
            ]}></Animated.View>
        </View> */}

      {/* <View style={styles.externStepsIndicatoView}>
          <Text style={styles.externStepsIndicatoText}>
            {Math.floor(wordIndice / 4) + 1}/4
          </Text>
        </View> */}
      {/* </View> */}
      <View style={styles.progressWrapper}>
        <View style={[styles.progrBarElement, styles.niceprogrBarElementColor]}>
          <Animated.View
            style={[
              styles.progrBarElementIntern,
              styles.niceProgBarColorIntern,
              {width: progressAnim},
            ]}></Animated.View>
        </View>
        {/* <View style={styles.externStepsIndicatoView}>
          <Text style={styles.externStepsIndicatoText}>
            {Math.floor(wordIndice / 4) + 1}/4
          </Text>
        </View> */}
      </View>

      {/* <TouchableOpacity onPress={handleNext} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Next Stage</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({
  niceProgBarColorIntern: {
    backgroundColor: COLORS.black,
    width: '100%',
  },
  niceprogrBarElementColor: {
    borderColor: COLORS.black,
  },
  progrBarElementIntern: {
    height: 5,

    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
  },

  progrBarElement: {
    width: '70%',
    height: 5,
    backgroundColor: COLORS.white,
    // position: 'relative',
    borderRadius: 4,
    borderWidth: 0,

    marginLeft: 0,
  },

  progBarInternStyle: {
    height: 14,

    borderRadius: 10,
    backgroundColor: '#004290',
  },
  progressWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20,
  },
  externStepsIndicatoView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFB552',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
  },
  externStepsIndicatoText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: 'red',
    marginBottom: 20,
    height: 20,
  },
  buttonTextStyle: {
    color: '#fff',
  },
  progBarExternStyle: {
    width: '70%',
    height: 18,

    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FD9203',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#bcd25a',
    paddingTop: 20,
    paddingVertical: 15,
  },
});
