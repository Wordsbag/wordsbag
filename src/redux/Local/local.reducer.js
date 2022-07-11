import localTypes from './local.types';

const INITIAL_STATE = {
  wordsBagId: null,
  repeatedNbr: null,
  step: null,
  timeOfCreation: null,
  bagItself: null,
  bagSounds: [],
  loadSound: false,
};

const localReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case localTypes.ADD_TO_LOCAL:
      return {
        ...state,
        wordsBagId: 13,
      };
    case localTypes.ADD_THIS_BAG_TO_LOCAL:
      return {
        ...state,
        wordsBagId: action.payload.idOfTheBag,
        repeatedNbr: 0,
        step: 0,
        timeOfCreation: new Date().getTime(),
        bagItself: action.payload.bagItselfPayload,
      };
    case localTypes.ADD_SOUNDS:
      return {
        ...state,
        bagSounds: action.payload,
      };
    case localTypes.SOUND_LOADED:
      return {
        ...state,
        loadSound: true,
      };
    case localTypes.CLEAR_REDUX_PERSIST_BAGS:
      return {
        ...state,
        wordsBagId: null,
        repeatedNbr: null,
        step: null,
        timeOfCreation: null,
        bagItself: null,
        bagSounds: [],
        loadSound: false,
      };
    default:
      return state;
  }
};

export default localReducer;
