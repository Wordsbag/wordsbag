import loopTypes from './loop.types';

const INITIAL_STATE = {
  ourStep: 0,
  errors: [],
  wordNow: '',
  globalStep: 0,
  myWordIndice: 0,
};

const loopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loopTypes.GO_TO_WORD_INTRO:
      return {
        ...state,
        ourStep: 1,
      };
    case loopTypes.GO_TO_WORD_SUGG_CARD_BUILDER:
      return {
        ...state,
        ourStep: 2,
      };
    case loopTypes.GO_TO_WORD_FROM_SCRATCH_BUILDER:
      return {
        ...state,
        ourStep: 3,
      };
    case loopTypes.GO_TO_WORD_OUTRO:
      return {
        ...state,
        ourStep: 4,
      };

    case loopTypes.GO_TO_THREE_PLUS:
      return {
        ...state,
        ourStep: 5,
      };
    case loopTypes.GO_TO_FINAL_LOOP_SCREEN:
      return {
        ...state,
        ourStep: 12,
      };
    case loopTypes.ADD_TO_THREE_WORDS_STEPS:
      return {
        ...state,
        globalStep: action.payload,
      };
    case loopTypes.NEXT_STEP:
      return {
        ...state,
        ourStep: action.payload,
      };
    case loopTypes.RESET_STEPS:
      return {
        ...state,
        ourStep: 1,
      };
    case loopTypes.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case loopTypes.FIRST_WORD:
      return {
        ...state,
        wordNow: action.payload.thisWord,
      };
    case loopTypes.NEXT_WORD:
      return {
        ...state,
        wordNow: action.payload.thisWord,
        myWordIndice: action.payload.newIndice,
      };
    default:
      return state;
  }
};

export default loopReducer;
