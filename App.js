import React, {useEffect} from 'react';
import {Animated, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/createStore';
import LiquidSwip from './src/components/swip/';
import {Quiz} from './src/components/quiz/screens/';
import {FirstBuilder} from './src/components/first';
import Loop from './src/Loop/Loop';
import ProgressIndicator from './src/components/progressBar/ProgressIndicator';
import AppNav from './src/AppNav';
const App = () => {
  // const animated = new Animated.Value(0);
  // const duration = 5000;

  // useEffect(() => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(animated, {
  //         toValue: 255,
  //         duration: duration,
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(animated, {
  //         toValue: 0,
  //         duration: duration,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //   ).start();
  // }, []);

  return (
    <Provider store={store}>
      {/* <Loop /> */}
      <AppNav />
    </Provider>
  );
};

export default App;
