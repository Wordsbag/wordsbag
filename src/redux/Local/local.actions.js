import localTypes from './local.types';

export const addToLocal = wordId => dispatch => {
  console.log('from reduxc persist add to local');
  dispatch({
    type: localTypes.ADD_TO_LOCAL,
    payload: {
      thisWordId: wordId,
    },
  });
};

export const addThisBagToLocal = idOfTheBag => dispatch => {
  console.log('from redux persist add this bag to local');
  dispatch({
    type: localTypes.ADD_THIS_BAG_TO_LOCAL,
    payload: idOfTheBag,
  });
};

export const clearReduxPersistBags = () => dispatch => {
  console.log('from redux persist clearReduxPersistBags');
  dispatch({
    type: localTypes.CLEAR_REDUX_PERSIST_BAGS,
  });
};
