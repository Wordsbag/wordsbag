import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addWordToBag,
  removeWordFromBag,
} from '../../redux/WordBag/wordbag.actions';

const mapState = ({wordBagReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
});

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const WordCard = ({firstWord, secondWord, wordId}) => {
  const {wordsBag} = useSelector(mapState);
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.myCard}>
      <View style={styles.firstWord}>
        <View style={styles.firstWordLang}>
          <Image
            style={styles.languageFlagImg}
            source={require('../../assets/united-states.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.languageIndicTxt}>English</Text>
        </View>
        <Text style={styles.firstWordTxt}>{firstWord}</Text>
      </View>

      <View style={styles.secondWord}>
        <View style={styles.firstWordLang}>
          <Image
            style={styles.languageFlagImg}
            source={require('../../assets/germany.png')}
            resizeMode={'contain'}
          />
          <Text style={styles.languageIndicTxt}>German</Text>
        </View>
        <Text style={styles.firstWordTxt}>{secondWord}</Text>
      </View>

      <View style={styles.btnsContainer}>
        <TouchableOpacity
          style={styles.addToBagBtn}
          onPress={() => {
            setPressed(true);
            dispatch(addWordToBag(wordId));
          }}
          disabled={wordsBag.length >= 12}>
          {!pressed ? (
            <SimpleLineIcons
              name="handbag"
              style={{
                color: '#03045e',
                fontSize: 25,
              }}
            />
          ) : (
            <Ionicons
              name="eye"
              style={{
                color: '#fff',
                fontSize: 25,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.knowItBtn}
          onPress={() => dispatch(removeWordFromBag(wordId))}>
          <Ionicons
            name="eye-off"
            style={{
              color: '#fff',
              fontSize: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WordCard;

const styles = StyleSheet.create({
  myCard: {
    backgroundColor: '#03045e',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '90%',
    marginHorizontal: windowWidth / 20,
    borderRadius: 20,
  },
  firstWord: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  secondWord: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  firstWordLang: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageFlagImg: {
    marginRight: 10,
    width: 16,
    height: 16,
  },
  languageIndicTxt: {
    fontSize: 14,
    color: '#fff',
  },
  firstWordTxt: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  btnsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  addToBagBtn: {
    backgroundColor: '#FCF7FF',
    width: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // Shadow
    shadowColor: '#fff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 10,
  },

  knowItBtn: {
    backgroundColor: '#023e8a',
    width: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // Shadow
    shadowColor: '#fff',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 10,
  },
});
