import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Vibration,
  Easing,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {wrapper} from '../../besmart/firstAlgo';
import Background from '../../assets/images/bg.jpg';
import {Quiz} from '../quiz/screens';
import Sound from 'react-native-sound';
import {
  getFirstWord,
  nextStep,
  goWordFromScratchBuilder,
} from '../../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';

const mapState = ({loop}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  errors: loop.errors,
  globalStep: loop.globalStep,
});

const WordSuggCardBuilder = ({setfirst}) => {
  const {ourStep, wordNow, globalStep, errors} = useSelector(mapState);
  const dispatch = useDispatch();

  const [answerText, setAnswerText] = useState('');
  const [wordToPlyWith, setWordToPlyWith] = useState('Success');
  const [colorHighlight, setColorHighlight] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [dataState, setDataState] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ONE_SECOND_IN_MS = 100;

  useEffect(() => {
    console.log('wordToPlyWith is ', wordToPlyWith);

    const getData = async () => {
      setAnswerText('');
      setWordIndex(0);
      const data = await wrapper(wordNow.wordLang1);
      setDataState(data);
    };
    getData();
  }, []);

  // ***** Animation BLOC Start *****
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [quizBtnBounce, setQuizBtnBounce] = useState(new Animated.Value(0));
  const [nextBtnAnimation, setNextBtnAnimation] = useState(
    new Animated.Value(0),
  );
  const [btnTextColorAnimation, setBtnTextColorAnimation] = useState(
    new Animated.Value(0),
  );
  const transalteAnim = useRef(new Animated.Value(-windowWidth)).current;
  const transalteAnimVertical = useRef(
    new Animated.Value(-windowHeight),
  ).current;

  const boxInterpolation = nextBtnAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,255,255)', 'rgb(60, 179, 75)'],
  });
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

  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  const spin = quizBtnBounce.interpolate({
    inputRange: [0, 1, 2, 4, 5],
    outputRange: ['0deg', '20deg', '0deg', '-20deg', '0deg'],
  });

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
      setfirst(3);
    });
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTo();
    console.log('fadeAnim => ', fadeAnim);
    console.log('quizBtnBounce => ', quizBtnBounce);
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log('Component Will Unmount !');
  //   };
  // });
  // ***** Animation BLOC End *****

  const dataSuggestionCards = [
    {
      wordId: 1,
      word: 'e',
      showOrNot: true,
    },
    {
      wordId: 2,
      word: 'de',
      showOrNot: true,
    },
    {
      wordId: 3,
      word: 'Su',
      showOrNot: true,
    },
    {
      wordId: 4,
      word: 'ss',
      showOrNot: true,
    },
    {
      wordId: 5,
      word: 'cc',
      showOrNot: true,
    },
  ];
  const sound = new Sound('correct.mp3');
  const playSound = () => {
    sound.play();
  };
  const suggestionPressHandler = async wordPressed => {
    let nextExpectedId = wordIndex;
    let stringAnswerToCHeck = '';
    if (wordPressed.wordId !== nextExpectedId) {
      console.warn('Wrong Answer !!!!');
      // Vibrate For One Seconde

      Vibration.vibrate(ONE_SECOND_IN_MS);
    } else {
      const lastWord = answerText;
      // stringAnswerToCHeck = answerText;
      setAnswerText(lastWord + wordPressed.word);
      stringAnswerToCHeck = lastWord + wordPressed.word;
      const newData = dataState;
      console.log('hello there => ', wordPressed);
      // newData.filter(word => word.id == wordPressed.id);
      newData.forEach(word => {
        if (word.wordId === wordPressed.wordId) {
          console.log('wordId pR => ', wordPressed.wordId);
          word.showOrNot = false;
        }
      });
      console.log('newData => ', newData);
      setDataState(newData);
      setWordIndex(wordIndex + wordPressed.word.length);
      console.log('answerText =>', stringAnswerToCHeck);
      console.log('wordToPlyWith =>', wordToPlyWith);
    }
    if (stringAnswerToCHeck === wordNow.wordLang1) {
      console.log('Yessssssss Hamdoulh');
      playSound();
      bounceBtnQuizFunct();
    } else {
      console.log('Nooooo Hamdoulh');
    }
  };
  const handleNextBtnEvent = async () => {
    await translateOut();
    dispatch(goWordFromScratchBuilder());
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
      {/* <Image
        style={styles.bgImageStyle}
        source={Background}
        resizeMode={'cover'}
      /> */}
      {/* The Language Indicator */}
      <View style={{flex: 3}}>
        <View style={styles.languageIndicator}>
          <Image
            style={styles.languageFlagImg}
            source={require('./assets/united-states.png')}
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
            alignItems: 'center',
          }}>
          <View style={styles.answerBox}>
            <Text style={styles.answerBoxText}>{answerText}</Text>
          </View>
        </View>
        {/* The suggestions Cards */}
        <View style={styles.suggestionCards}>
          {dataState.map(card => (
            <TouchableOpacity
              disabled={!card.showOrNot}
              key={card.wordId}
              style={[styles.suggCard, {width: card.word.length * 30}]}
              onPress={() => {
                suggestionPressHandler(card);
              }}>
              {card.showOrNot ? (
                <Text style={[styles.suggCardText]}>{card.word}</Text>
              ) : null}
            </TouchableOpacity>
          ))}
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
            onPress={handleNextBtnEvent}>
            <Animated.Text style={[styles.btnNextText, btnColorStyle]}>
              Next
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default WordSuggCardBuilder;

const styles = StyleSheet.create({
  btnNextText: {
    textAlign: 'center',

    fontSize: 20,
  },
  btnNext: {
    // backgroundColor: '#fff',
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
    marginTop: 30,
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
  answerBox: {
    marginTop: 60,
    width: '80%',
    backgroundColor: '#F1F1F1',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
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
    // backgroundColor: '#c3dd51',
    paddingTop: 0,
  },
});

// password : 123123
