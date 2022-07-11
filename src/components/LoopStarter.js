import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getFirstWord,
  nextStep,
  nextWord,
  stepReset,
  goIntro,
  getData,
} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';
import {collection, query, where, getDocs, orderBy} from 'firebase/firestore';
import {db} from '../firebase/utils';
const mapState = ({loop, localReducer}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  errors: loop.errors,
  globalStep: loop.globalStep,
  wordsOfThisBag: loop.wordsOfThisBag,
  loopCanStart: loop.loopCanStart,
  myLocalBag: localReducer.bagItself,
});

const LoopStarter = () => {
  const {
    ourStep,
    wordNow,
    globalStep,
    errors,
    wordsOfThisBag,
    myLocalBag,
    loopCanStart,
  } = useSelector(mapState);
  // const {wordsOfThisBag} = useSelector(mapState2);
  const dispatch = useDispatch();
  const startLoopHandler = () => {
    console.log('Hello There =>', wordsOfThisBag);
    dispatch(getFirstWord(wordsOfThisBag));
    dispatch(goIntro());
  };
  // const getData = async () => {
  //   const IdUser = '4iJ22z4syzt2H2SyenPo';
  //   var arrayOfWordsId;
  //   const arrayOfWordsOfThisBag = [];
  //   const q = query(
  //     collection(db, 'sessionWords', IdUser, 'sessionsWordsOfThisUser'),
  //     where('stepReached', '==', 8),
  //   );

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach(doc => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log('the Words Id', ' => ', doc.data());
  //     // arrayOfWordsId.push(doc.data().idsOfWordsToLearnNow);
  //     arrayOfWordsId = doc.data().idsOfWordsToLearnNow;
  //   });
  //   try {
  //     console.log('arrayOfWordsId', arrayOfWordsId);
  //     // arrayOfWordsId.forEach(async item => {
  //     const q2 = query(collection(db, 'wordCollection'));
  //     const querySnapshot2 = await getDocs(q2);
  //     querySnapshot2.forEach(doc => {
  //       // doc.data() is never undefined for query doc snapshots
  //       if (arrayOfWordsId.includes(doc.id)) {
  //         arrayOfWordsOfThisBag.push(doc.data());
  //         console.log('the words itself', ' => ', doc.data());
  //       }
  //     });
  //     // });
  //   } catch (err) {
  //     console.log('this is our error =>', err);
  //   }
  // };

  useEffect(() => {
    console.log('Hello This Is Our Bag Of Words =>', loopCanStart);

    // loadWordsAndUpdateReduxState
    dispatch(getData(myLocalBag)).then(console.log('yesssss'));
  }, []);
  useEffect(() => {
    console.log('wordsOfThisBag', wordsOfThisBag);
  }, [wordsOfThisBag]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>LoopStarter</Text>
      <TouchableOpacity
        disabled={!loopCanStart}
        onPress={startLoopHandler}
        style={styles.btnGo}>
        {loopCanStart ? (
          <Text style={styles.btnGoText}>GO Ahead</Text>
        ) : (
          <Text style={styles.btnGoText}>Loading</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoopStarter;

const styles = StyleSheet.create({
  btnGoText: {
    fontSize: 20,
    fontWeight: '600',
  },
  btnGo: {
    backgroundColor: '#FFB552',
    padding: 15,
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
});
