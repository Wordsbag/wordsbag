import wordBagTypes from './wordbag.types';

const INITIAL_STATE = {
  wordsBag: [],
  wordsBagAddedSuccess: false,
  loading: false,
  wordsBagAddedId: '',
};

const wordBagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case wordBagTypes.ADD_WORD_TO_BAG:
      return {
        ...state,
        wordsBag: [...state.wordsBag, action.payload.thisWordId],
      };
    case wordBagTypes.REMOVE_WORD_FROM_BAG:
      return {
        ...state,
        wordsBag: state.wordsBag.filter(
          item => item !== action.payload.thisWordId,
        ),
      };
    case wordBagTypes.CREATE_NEW_BAG:
      return {
        ...state,
        wordsBag: [],
      };
    case wordBagTypes.NEW_BAG_CREATED_SUCCESSFULY:
      return {
        ...state,
        wordsBagAddedSuccess: true,
        loading: true,
        wordsBag: [],
        wordsBagAddedId: action.idOftheBagCreated,
      };
    case wordBagTypes.LOADING_HANDLE:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default wordBagReducer;
