import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FDF7F2',
  secondary: '#1E90FF',
  accent: '#3498db',
  border: '#BAC4DC',

  success: '#00C851',
  error: '#ff4444',

  black: '#171717',
  white: '#323140',
  background: '#323140',
  txt: '#fff',

  progBar1: '#50f2a7',
  progBar2: '#f26430',
  progBar3: '#1E90FF',

  btn: '#f26430',

  counter: '#171926',

  topNavIcon: '#fff',
};

export const SIZES = {
  base: 10,
  width,
  height,
};
