import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearReduxPersistBags} from '../redux/Local/local.actions';
const mapState = ({localReducer}) => ({
  localWordsBag: localReducer.localWordsBag,
});

const Splash = ({navigation}) => {
  const {localWordsBag} = useSelector(mapState);
  const dispatch = useDispatch();

  const goToHome = () => {
    console.log('goToHome');
    navigation.navigate('Home');
  };
  const clearReduxPersist = () => {
    console.log('clearReduxPersist');
    dispatch(clearReduxPersistBags());
  };
  useEffect(() => {
    console.log('localWordsBag => ', localWordsBag);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
      <TouchableOpacity onPress={goToHome} style={styles.btnGo}>
        {localWordsBag[0] === 10 ? (
          <Text style={styles.btnGoText}>Hahah</Text>
        ) : (
          <Text style={styles.btnGoText}>Hahaha</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={clearReduxPersist} style={styles.btnGo}>
        <Text style={styles.btnGoText}>Clear Redux Persist bags</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  btnGo: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
  },
  btnGoText: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
