import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  getFirstWord,
  nextStep,
  nextWord,
  stepReset,
  goIntro,
} from '../redux/Loop/loop.actions';
import {useDispatch, useSelector} from 'react-redux';

const mapState = ({loop}) => ({
  ourStep: loop.ourStep,
  wordNow: loop.wordNow,
  errors: loop.errors,
  globalStep: loop.globalStep,
});

const LoopStarter = () => {
  const {ourStep, wordNow, globalStep, errors} = useSelector(mapState);
  const dispatch = useDispatch();
  const startLoopHandler = () => {
    dispatch(getFirstWord());
    dispatch(goIntro());
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>LoopStarter</Text>
      <TouchableOpacity onPress={startLoopHandler} style={styles.btnGo}>
        <Text style={styles.btnGoText}>GO Ahead</Text>
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
    fle: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
});
