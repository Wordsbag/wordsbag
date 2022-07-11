import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from '../assets/images/bg.jpg';
import {WordSuggCardBuilder} from '../components/first';
import {Quiz} from '../components/quiz/screens';
import WordIntro from '../components/WordIntro';
import WordWriteFromScratch from '../components/WordWriteFromScratch';
import ProgressIndicator from '../components/progressBar/ProgressIndicator';
import {
  getFirstWord,
  nextStep,
  nextWord,
  stepReset,
} from '../redux/Loop/loop.actions';
import {addSoundsToBag} from '../redux/Local/local.actions';
import {useDispatch, useSelector} from 'react-redux';
import LoopStarter from '../components/LoopStarter';
import WordOutro from '../components/WordOutro';
import BetweenThree from '../components/BetweenThree';
import FinalLoopScreen from '../components/FinalLoopScreen';
import Sound from 'react-native-sound';
import {COLORS} from '../constants';
const mapState = ({loop, localReducer}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  errors: loop.errors,
  globalStep: loop.globalStep,
  myWordIndice: loop.myWordIndice,
  loadSound: localReducer.loadSound,
  bagSounds: localReducer.bagSounds,
});

const Loop = () => {
  const [ourAudio, setOurAudio] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Audio File Handling
  // if (!isLoaded) {
  //   var audio = new Sound(
  //     'https://firebasestorage.googleapis.com/v0/b/taxproject-3635f.appspot.com/o/audio%2FBoondoggle.mp3?alt=media&token=e9a0faed-3528-4d0a-ac07-cd66cadb3656',
  //     null,
  //     error => {
  //       if (error) {
  //         console.log('failed to load the sound', error);
  //         return;
  //       }
  //       // if loaded successfully
  //       console.log(
  //         'duration in seconds: ' +
  //           audio.getDuration() +
  //           'number of channels: ' +
  //           audio.getNumberOfChannels(),
  //       );
  //       console.log('our sound is => ', audio);
  //       setOurAudio(audio);
  //       setIsLoaded(true);
  //     },
  //   );
  // }
  const getAudioFilesOfWordsOfThisLoop = () => {};
  const {
    ourStep,
    wordNow,
    globalStep,
    errors,
    myWordIndice,
    loadSound,
    bagSounds,
  } = useSelector(mapState);

  const [first, setfirst] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('from Loop Container =>', globalStep);
  }, [ourStep]);
  useEffect(() => {
    console.log('loadSound => ', loadSound);
    if (!loadSound) {
      dispatch(addSoundsToBag());
    }
  }, []);
  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.bgImageStyle}
        source={Background}
        resizeMode={'cover'}
      /> */}
      {/* <FlatList
        data={DATA}
        renderItem={({item, index}) => {
          first === 1 ? (
            <Second setfirst={setfirst} />
          ) : first === 2 ? (
            <FirstBuilder setfirst={setfirst} />
          ) : (
            <Quiz />
          );
        }}
        keyExtractor={item => item.id}
      /> */}
      {ourStep !== 12 ? <ProgressIndicator /> : null}

      {ourStep === 0 ? (
        <LoopStarter />
      ) : ourStep === 1 ? (
        <WordIntro ourAudio={ourAudio} />
      ) : ourStep === 2 ? (
        <WordSuggCardBuilder setfirst={setfirst} />
      ) : ourStep === 3 ? (
        <WordWriteFromScratch setfirst={setfirst} />
      ) : ourStep === 4 ? (
        <WordOutro setfirst={setfirst} />
      ) : ourStep === 5 ? (
        <BetweenThree />
      ) : ourStep === 12 ? (
        <FinalLoopScreen />
      ) : (
        <Quiz />
      )}
    </View>
  );
};

export default Loop;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,

    backgroundColor: COLORS.progBar2,
    paddingTop: 0,
  },
});
