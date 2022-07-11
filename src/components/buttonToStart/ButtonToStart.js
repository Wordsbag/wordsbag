import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNewBag} from '../../redux/WordBag/wordbag.actions';
import {addThisBagToLocal} from '../../redux/Local/local.actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapState = ({wordBagReducer, localReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
  loading: wordBagReducer.loading,
  wordsBagAddedSuccess: wordBagReducer.wordsBagAddedSuccess,
  wordsBagAddedId: wordBagReducer.wordsBagAddedId,
  localWordsBag: localReducer.localWordsBag,
});

const ButtonToStart = () => {
  const {
    wordsBag,
    wordsBagAddedId,
    loading,
    wordsBagAddedSuccess,
    localWordsBag,
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const createBag = () => {
    console.log(wordsBag);
    dispatch(createNewBag(wordsBag));
    console.log('added of function => ', wordsBagAddedId);
  };

  useEffect(() => {
    console.log('added => ', wordsBagAddedId);
    if (wordsBagAddedSuccess) {
      if (wordsBagAddedId !== '') {
        dispatch(addThisBagToLocal(wordsBagAddedId, wordsBag));
      }
    }
  }, [wordsBagAddedId]);
  useEffect(() => {
    console.log('we are here ,', localWordsBag);
  }, []);

  return (
    <TouchableOpacity
      style={styles.btnStartWrapper}
      onPress={() => createBag()}>
      <Text style={styles.actionBtnText}> Create Bag </Text>
      <View style={styles.counterDesign}>
        <Text style={styles.counterDesignTxt}>{wordsBag.length}/12</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonToStart;

const styles = StyleSheet.create({
  counterDesign: {
    backgroundColor: '#03045e',
    height: 46,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 8,
  },
  counterDesignTxt: {
    color: '#ade8f4',
    fontSize: 16,
  },
  btnStartWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: windowHeight - 150,
    width: 220,
    height: 70,
    left: windowWidth / 2 - 110,
    zIndex: 10,
    elevation: 10,

    backgroundColor: '#caf0f8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#03045e',
    fontSize: 18,
    fontWeight: '500',
  },
});
