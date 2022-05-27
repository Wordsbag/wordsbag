import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  TextInput,
  Vibration,
  Easing,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Sound from 'react-native-sound';
import {nextStep, goOutro} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';

const mapState = ({loop}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  errors: loop.errors,
  globalStep: loop.globalStep,
});

const WordWriteFromScratch = ({setfirst}) => {
  const {ourStep, wordNow, globalStep, errors} = useSelector(mapState);
  const dispatch = useDispatch();
  const [answerText, onChangeAnswerText] = useState('');
  const [quizBtnBounce, setQuizBtnBounce] = useState(new Animated.Value(0));
  const [checked, setChecked] = useState(false);
  const [nextBtnAnimation, setNextBtnAnimation] = useState(
    new Animated.Value(0),
  );

  const handleNextBtnAnimation = () => {
    Animated.timing(nextBtnAnimation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const boxInterpolation = nextBtnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(60, 179, 75)'],
  });
  const boxInterpolationWrongAnswer = nextBtnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(238, 27, 36)'],
  });
  const spin = quizBtnBounce.interpolate({
    inputRange: [0, 1, 2, 4, 5],
    outputRange: ['0deg', '20deg', '0deg', '-20deg', '0deg'],
  });

  const sound = new Sound('correct.mp3');
  const playSound = () => {
    sound.play();
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // ***** Animation BLOC Start *****

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transalteAnim = useRef(new Animated.Value(-windowWidth)).current;

  const btnTextColorInterpolation = nextBtnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(39, 23, 93)', 'rgb(255,255,255)'],
  });

  const btnColorStyle = {
    color: btnTextColorInterpolation,
  };

  const bounceBtnQuizFunct = () => {
    Animated.parallel(
      [
        Animated.timing(quizBtnBounce, {
          toValue: 5,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(nextBtnAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ],
      {
        stopTogether: false, // <--- so that all animation get completed
      },
    ).start();
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
      setfirst(1);
    });
  };

  useEffect(() => {
    translateTo();
  }, []);

  const handleNextBtnEvent = async () => {
    await translateOut();
    dispatch(goOutro());
  };
  const handleCheckBtn = async () => {
    console.log('answerText', answerText);
    console.log('wordNow', wordNow.wordLang1);
    if (answerText === wordNow.wordLang1) {
      console.log('Very Good !!');
      bounceBtnQuizFunct();
      playSound();
      setChecked(true);
      handleNextBtnAnimation();
    } else {
      console.log('Oops !!');
      setChecked(true);
      handleNextBtnAnimation();
    }
  };
  const animatedStyle = {
    backgroundColor:
      answerText === wordNow.wordLang1
        ? boxInterpolation
        : boxInterpolationWrongAnswer,
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            // {translateY: transalteAnimVertical},
            {translateX: transalteAnim},
          ],
        },
      ]}>
      <StatusBar hidden />
      {/* The Language Indicator */}
      <View style={{flex: 3}}>
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
          <Animated.Text
            style={[
              styles.wordTolearn,
              {
                opacity: fadeAnim,
              },
            ]}>
            {wordNow.wordLang1}
          </Animated.Text>
        </View>

        {/* The Box Where of the answer of the user */}
        <View
          style={{
            // alignItems: 'center',
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.answerBox}>
            <TextInput
              value={answerText}
              onChangeText={onChangeAnswerText}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="write the word ..."
              placeholderTextColor="#fff"
              multiline={true}
              autoCorrect={false}
              // autoCapitalize="none"
              // placeholder="answer here ..."
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            styles.btnNext,
            animatedStyle,
            {
              transform: [
                // {translateY: transalteAnimVertical},
                {rotateZ: spin},
              ],
            },
          ]}>
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 20,
              // backgroundColor: 'red',
              borderRadius: 20,
            }}
            onPress={!checked ? handleCheckBtn : handleNextBtnEvent}>
            <Animated.Text style={[styles.btnNextText, btnColorStyle]}>
              {!checked ? 'Check' : 'Next'}
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default WordWriteFromScratch;

const styles = StyleSheet.create({
  answerBox: {
    padding: 15,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  input: {
    textAlign: 'center',
    flex: 1,
    // marginTop: 60,
    borderColor: '#fff',
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: 20,
  },
  btnNextText: {
    textAlign: 'center',
    color: '#27175D',
    fontSize: 20,
  },
  btnNext: {
    backgroundColor: '#fff',

    width: '80%',
    borderRadius: 20,
  },
  bgImageStyle: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.07,
  },
  suggCardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27175D',
  },
  suggestionCards: {
    marginTop: 80,
    flexDirection: 'row',
    paddingHorizontal: 40,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  suggCard: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  answerBoxText: {
    color: '#27175D',
    fontSize: 35,
  },

  wordToLearnWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  wordTolearn: {
    fontSize: 50,
    color: 'white',
  },
  languageName: {
    fontSize: 20,
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
  container: {
    flex: 1,
    // backgroundColor: '#27175D',
    paddingTop: 0,
  },
});

// password : 123123
