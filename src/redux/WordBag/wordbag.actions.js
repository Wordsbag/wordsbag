import wordBagTypes from './wordbag.types';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../../firebase/utils';
export const addWordToBag = wordId => dispatch => {
  console.log('from redux add word to bag');
  dispatch({
    type: wordBagTypes.ADD_WORD_TO_BAG,
    payload: {
      thisWordId: wordId,
    },
  });
};

export const removeWordFromBag = wordId => dispatch => {
  console.log('from redux remove word from bag');
  dispatch({
    type: wordBagTypes.REMOVE_WORD_FROM_BAG,
    payload: {
      thisWordId: wordId,
    },
  });
};

export const createNewBag = wordsInThisBag => async dispatch => {
  console.log('from redux create New Bag');
  dispatch({
    type: wordBagTypes.LOADING_HANDLE,
    payload: true,
  });
  const IdUser = '4iJ22z4syzt2H2SyenPo';
  try {
    const docRef = await addDoc(
      collection(db, 'sessionWords', IdUser, 'sessionsWordsOfThisUser'),
      {
        idsOfWordsToLearnNow: wordsInThisBag,
        stepReached: 8,
        timeStamp: Date.now(),
      },
    );
    dispatch({
      type: wordBagTypes.NEW_BAG_CREATED_SUCCESSFULY,
      payload: false,
    });
    dispatch({
      type: wordBagTypes.LOADING_HANDLE,
      payload: false,
    });
  } catch (err) {
    console.log('Error In Ceating New Bag !!');
    console.log(err);
  }
};
