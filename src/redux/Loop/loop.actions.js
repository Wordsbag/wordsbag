import loopTypes from './loop.types';
import {collection, query, where, getDocs, orderBy} from 'firebase/firestore';
import {db} from '../../firebase/utils';

// const DATA = [
//   {
//     id: 1,
//     wordLang1: 'Hello',
//     wordLang2: 'Salut',
//   },
//   {
//     id: 2,
//     wordLang1: 'Lot',
//     wordLang2: 'Beacoup',
//   },
//   {
//     id: 3,
//     wordLang1: 'Small',
//     wordLang2: 'Petit', // after this we need to see the +3 words screen
//   },
//   {
//     id: 4,
//     wordLang1: 'Awfulize',
//     wordLang2: 'Affreux',
//   },
//   {
//     id: 5,
//     wordLang1: 'Anomaly',
//     wordLang2: 'Anomalie',
//   },
//   {
//     id: 6,
//     wordLang1: 'Boondoggle',
//     wordLang2: 'Gâchis', // after this we need to see the +3 words screen
//   },
//   {
//     id: 7,
//     wordLang1: 'Bravado',
//     wordLang2: 'Bravade',
//   },
//   {
//     id: 8,
//     wordLang1: 'Hello',
//     wordLang2: 'Salut',
//   },
//   {
//     id: 9,
//     wordLang1: 'Lot',
//     wordLang2: 'Beacoup', // after this we need to see the +3 words screen
//   },
//   {
//     id: 10,
//     wordLang1: 'Small',
//     wordLang2: 'Petit',
//   },
//   {
//     id: 11,
//     wordLang1: 'Awfulize',
//     wordLang2: 'Affreux',
//   },
//   {
//     id: 12,
//     wordLang1: 'School',
//     wordLang2: 'Ecole', // after this we need to see the +3 words screen
//   },
// ];
export const nextStep = ourStepRedux => async dispatch => {
  try {
    console.log('From Next Step Loop Action', ourStepRedux);
    dispatch({
      type: loopTypes.NEXT_STEP,
      payload: ourStepRedux + 1,
    });
  } catch (err) {
    console.log('from catch in Next Step Loop Action', err);
    const error = ['Next Step Problem'];
    dispatch({
      type: loopTypes.SET_ERRORS,
      payload: error,
    });
  }
};

// Loop Navigations Start
export const goIntro = () => dispatch => {
  console.log('from goIntro');
  dispatch({
    type: loopTypes.GO_TO_WORD_INTRO,
  });
};
export const goSuggCardBuilder = () => dispatch => {
  console.log('from goSuggCardBuilder');
  dispatch({
    type: loopTypes.GO_TO_WORD_SUGG_CARD_BUILDER,
  });
};
export const goWordFromScratchBuilder = () => dispatch => {
  dispatch({
    type: loopTypes.GO_TO_WORD_FROM_SCRATCH_BUILDER,
  });
};
export const goOutro = () => dispatch => {
  dispatch({
    type: loopTypes.GO_TO_WORD_OUTRO,
  });
};

export const goToThreePlus = () => dispatch => {
  dispatch({
    type: loopTypes.GO_TO_THREE_PLUS,
  });
};

export const goToFinalLoopScreen = () => dispatch => {
  dispatch({
    type: loopTypes.GO_TO_FINAL_LOOP_SCREEN,
  });
};

export const addToThreWordsSteps = step => dispatch => {
  dispatch({
    type: loopTypes.ADD_TO_THREE_WORDS_STEPS,
    payload: step,
  });
};
// Loop Navigations End

export const stepReset = () => dispatch => {
  dispatch({
    type: loopTypes.RESET_STEPS,
  });
};
export const nextWord = (wordsOfThisBag, indice) => dispatch => {
  console.log('from redux next word');
  dispatch({
    type: loopTypes.NEXT_WORD,
    payload: {
      newIndice: indice,
      thisWord: wordsOfThisBag[indice],
    },
  });
};

export const getFirstWord = wordsOfThisBag => async dispatch => {
  console.log('hello from redux');
  dispatch({
    type: loopTypes.FIRST_WORD,
    payload: {
      thisWord: wordsOfThisBag[0],
    },
  });
};

export const getData = () => async dispatch => {
  console.log('hello from redux "getData" function');
  const IdUser = '4iJ22z4syzt2H2SyenPo';
  var arrayOfWordsId;
  const arrayOfWordsOfThisBag = [];
  const q = query(
    collection(db, 'sessionWords', IdUser, 'sessionsWordsOfThisUser'),
    where('stepReached', '==', 8),
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    console.log('the Words Id', ' => ', doc.data());
    // arrayOfWordsId.push(doc.data().idsOfWordsToLearnNow);
    arrayOfWordsId = doc.data().idsOfWordsToLearnNow;
  });
  try {
    console.log('arrayOfWordsId', arrayOfWordsId);
    // arrayOfWordsId.forEach(async item => {
    const q2 = query(collection(db, 'wordCollection'));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      if (arrayOfWordsId.includes(doc.id)) {
        arrayOfWordsOfThisBag.push({
          id: doc.id,
          wordLang1: doc.data().italian.word,
          wordLang2: doc.data().german.word,
        });
      }
    });
    // console.log('the words itself', ' => ', wordsOfThisBag);
    dispatch({
      type: loopTypes.SET_WORDS_BAG,
      payload: arrayOfWordsOfThisBag,
    });
    // });
  } catch (err) {
    console.log('this is our error =>', err);
  }
};
