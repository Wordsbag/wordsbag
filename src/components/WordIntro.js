import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import {
  getFirstWord,
  nextStep,
  nextWord,
  stepReset,
  goSuggCardBuilder,
} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';
const mapState = ({loop}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  wordIndice: loop.myWordIndice,
  errors: loop.errors,
  globalStep: loop.globalStep,
});
const WordIntro = ({ourAudio}) => {
  const [loaded, setLoaded] = useState(false);

  // Audio File Handling
  // var audio = new Sound(
  //   'https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav',
  //   null,
  //   error => {
  //     if (error) {
  //       console.log('failed to load the sound', error);
  //       return;
  //     }
  //     // if loaded successfully
  //     console.log(
  //       'duration in seconds: ' +
  //         audio.getDuration() +
  //         'number of channels: ' +
  //         audio.getNumberOfChannels(),
  //     );
  //     console.log('our sound is => ', audio);
  //   },
  // );

  const playSound = () => {
    ourAudio.play();
  };

  const {ourStep, wordNow, wordIndice, globalStep, errors} =
    useSelector(mapState);
  const dispatch = useDispatch();

  const [s, setS] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transalteAnim = useRef(new Animated.Value(-windowWidth)).current;
  // const [transalteAnim, setTranslateAnim] = useState(
  //   new Animated.Value(-windowWidth),
  // );

  // useEffect(() => {
  //   playSound();
  // }, [loaded]);

  useEffect(() => {
    translateTo();
    playSound();
    console.log('Where we are now :', wordIndice);
  }, [ourStep]);
  const handleAudioPlay = () => {
    playSound();
  };
  const translateTo = () => {
    Animated.parallel(
      [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(transalteAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ],
      {
        stopTogether: false, // <--- so that all animation get completed
      },
    ).start();
  };

  const translateOut = async () => {
    Animated.parallel(
      [
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(transalteAnim, {
          toValue: +windowWidth,
          duration: 300,
          useNativeDriver: true,
        }),
      ],
      {
        stopTogether: false, // <--- so that all animation get completed
      },
    ).start(() => {
      dispatch(goSuggCardBuilder());
    });
  };

  const handleNextBtnEvent = async () => {
    await translateOut(2);
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{translateX: transalteAnim}],
        },
      ]}>
      <View style={{flex: 3}}>
        <StatusBar hidden />
        {/* The Language Indicator */}
        <View style={styles.languageIndicator}>
          <Image
            style={styles.languageFlagImg}
            source={require('../assets/united-states.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.languageName}>English</Text>
        </View>

        {/* The Word To Learn */}
        <View style={styles.wordToLearnWrapper}>
          <Text style={[styles.wordTolearn]}>{wordNow.wordLang1}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity onPress={handleAudioPlay}>
            <Text style={{fontSize: 25, color: '#fff'}}>{'>>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.languageIndicator}>
          <Image
            style={styles.languageFlagImg}
            source={require('../assets/germany.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.languageName}>French</Text>
        </View>

        {/* The Word To Learn */}
        <View style={styles.wordToLearnWrapper}>
          <Text style={[styles.wordTolearn]}>{wordNow.wordLang2}</Text>
        </View>
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
    </Animated.View>
  );
};

export default WordIntro;

const styles = StyleSheet.create({
  wordToLearnWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  wordTolearn: {
    fontSize: 50,
    color: 'white',
  },
  languageFlagImg: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  languageIndicator: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 80,
  },
  languageName: {
    fontSize: 20,
    color: 'white',
  },
  btnNextText: {
    textAlign: 'center',
    color: '#27175D',
    fontSize: 20,
  },
  btnNext: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
