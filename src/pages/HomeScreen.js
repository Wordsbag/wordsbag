import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HeaderHome from '../components/headerHome/HeaderHome';
import WordCard from '../components/wordCard/WordCard';
import {useDispatch, useSelector} from 'react-redux';
import {collection, query, limit, getDocs} from 'firebase/firestore';
import {db} from '../firebase/utils';
import ButtonToStart from '../components/buttonToStart/ButtonToStart';
import TopHeader from '../components/topHeader/TopHeader';
import HomeStaticCard from '../components/homeStaticCard/HomeStaticCard';
import {COLORS} from '../constants';
const mapState = ({wordBagReducer, localReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
  isLoading: wordBagReducer.loading,
  wordsBagId: localReducer.wordsBagId,
  timeOfCreation: localReducer.timeOfCreation,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {wordsBag, isLoading, wordsBagId, timeOfCreation} =
    useSelector(mapState);
  const THREE_DAYS_IN_MS = 8 * 60 * 60 * 1000;
  const NOW_IN_MS = timeOfCreation;
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  const [words, setWords] = useState([]);
  const [loading, setLoaded] = useState(false);
  const [wordsBagFounded, setWordsBagFounded] = useState(false);
  var tab = [];
  const getWords = async () => {
    const q = query(
      collection(db, 'wordCollection'),
      limit(20),
      // orderBy('level'),
      // startAt(2),
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        let myObj = doc.data();
        myObj.id = doc.id;
        // console.log(doc.id, ' => ', myObj);
        tab.push(myObj);
        // setWords(oldWord => [...oldWord, myObj]);
      });
      setWords(tab);
    } catch (err) {
      console.log('my error', err);
    }
  };
  useEffect(() => {
    if (wordsBagId === null) {
      getWords().then(() => {
        setLoaded(true);
        // console.log('this is our words', tab);
      });
    } else {
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    console.log('date of creation =>', NOW_IN_MS);
  }, []);

  return (
    <SafeAreaView
      // start={{x: 0, y: 0}}
      // end={{x: 1, y: 1}}
      // colors={['purple', 'white']}
      style={styles.container}>
      <TopHeader />
      {/* <HeaderHome /> */}
      {/* <HomeStaticCard /> */}
      {/* {!loading ? <HeaderHomeWithWordsBag /> : null} */}
      {/* <HeaderHomeWithWordsBag /> */}
      {/* <ScrollView style={styles.container}>
        {loading ? (
          [
            words.map((val, index) => {
              return (
                <WordCard
                  key={index}
                  firstWord={val.english.word}
                  secondWord={val.german.word}
                  wordId={val.id}
                />
              );
            }),
          ]
        ) : (
          <ActivityIndicator size="large" color={'#03045e'} />
        )}
      </ScrollView> */}
      {wordsBagId === null ? null : <HomeStaticCard />}
      {wordsBagId === null ? (
        <>
          {loading ? (
            <FlatList
              // style={{backgroundColor: 'green'}}
              nestedScrollEnabled
              ListHeaderComponent={HeaderHome}
              data={words}
              // renderItem={WordCard}
              renderItem={({item, index, separators}) => {
                if (wordsBagId === null) {
                  return (
                    <WordCard
                      firstWord={item.english.word}
                      secondWord={item.german.word}
                      wordId={item.id}
                    />
                  );
                }
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <ActivityIndicator size="large" color={'#03045e'} />
          )}
        </>
      ) : null}

      {!isLoading ? null : (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,.4)',
          }}>
          <View style={styles.creatingLoadingCard}>
            <Text style={styles.creatingLoadingCardTxt}>
              Creating Your Bag ...
            </Text>
            <ActivityIndicator size="large" color={'#03045e'} />
          </View>
        </View>
      )}
      {wordsBagId === null ? <ButtonToStart /> : null}
      {/* <CountdownTimer targetDate={dateTimeAfterThreeDays} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  creatingLoadingCardTxt: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#03045e',
  },
  creatingLoadingCard: {
    backgroundColor: '#caf0f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: '60%',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
    paddingTop: 0,
    marginBottom: 0,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
});
