import localTypes from './local.types';

const INITIAL_STATE = {
  localWordsBag: [],
};

const localReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case localTypes.ADD_TO_LOCAL:
      return {
        ...state,
        localWordsBag: [...state.localWordsBag, 13],
      };
    case localTypes.ADD_THIS_BAG_TO_LOCAL:
      return {
        ...state,
        localWordsBag: [...state.localWordsBag, action.payload],
      };
    case localTypes.CLEAR_REDUX_PERSIST_BAGS:
      return {
        ...state,
        localWordsBag: [],
      };
    default:
      return state;
  }
};

export default localReducer;
