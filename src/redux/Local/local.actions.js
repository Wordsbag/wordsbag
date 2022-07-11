import wordBagTypes from '../WordBag/wordbag.types';
import localTypes from './local.types';
import Sound from 'react-native-sound';

export const addToLocal = wordId => dispatch => {
  console.log('from reduxc persist add to local');
  dispatch({
    type: localTypes.ADD_TO_LOCAL,
    payload: {
      thisWordId: wordId,
    },
  });
};

export const addThisBagToLocal = (idOfTheBag, bagItself) => dispatch => {
  console.log('from redux persist add this bag to local');
  dispatch({
    type: localTypes.ADD_THIS_BAG_TO_LOCAL,
    payload: {idOfTheBag: idOfTheBag, bagItselfPayload: bagItself},
  });
  dispatch({
    type: wordBagTypes.CLEAR_WORDS_BAG,
  });
};

export const clearReduxPersistBags = () => dispatch => {
  console.log('from redux persist clearReduxPersistBags');
  dispatch({
    type: localTypes.CLEAR_REDUX_PERSIST_BAGS,
  });
};
function playAudio(audio) {
  return new Promise(res => {
    audio.play();
    audio.onended = res;
  });
}

const getAudio = async () => {
  var audio = new Sound(
    'https://firebasestorage.googleapis.com/v0/b/taxproject-3635f.appspot.com/o/audio%2FBoondoggle.mp3?alt=media&token=e9a0faed-3528-4d0a-ac07-cd66cadb3656',
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds reduxxxx: ' +
          audio.getDuration() +
          'number of channels reduxxxx: ' +
          audio.getNumberOfChannels(),
      );
      console.log('our sound is => ', audio);
      // setOurAudio(audio);
      // setIsLoaded(true);
      // mySound = audio;
      mySound.push(audio);
      loaded = true;
    },
  );
  await playAudio(audio);
};

function makeObjectAsync() {
  const asyncResult = asyncOperation();
  return asyncResult.then(result => ({
    runSomething() {},
  }));
}

export const addSoundsToBag = () => dispatch => {
  console.log('from redux persist addSoundsToBag');
  var mySound = [];
  var loaded = false;

  // makeObjectAsync();

  var audio = new Sound(
    'https://firebasestorage.googleapis.com/v0/b/taxproject-3635f.appspot.com/o/audio%2FBoondoggle.mp3?alt=media&token=e9a0faed-3528-4d0a-ac07-cd66cadb3656',
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds reduxxxx: ' +
          audio.getDuration() +
          'number of channels reduxxxx: ' +
          audio.getNumberOfChannels(),
      );
      console.log('our sound is => ', audio);
      mySound.push(audio);
      loaded = true;
      dispatch({
        type: localTypes.ADD_SOUNDS,
        payload: mySound,
      });
      dispatch({
        type: localTypes.SOUND_LOADED,
      });

      // setOurAudio(audio);
      // setIsLoaded(true);
      // mySound = audio;
    },
  );
};
