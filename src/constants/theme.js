import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FDF7F2',
  secondary: '#1E90FF', //#1E90FF',
  accent: '#3498db',
  border: '#BAC4DC', //#BAC4DC',

  success: '#00C851', //#00C851',
  error: '#ff4444', //#ff4444',

  black: '#171717',
  white: '#fff',
  background: '#1f1147', //'#323140',
  txt: '#fff',

  progBar1: '#f7de81', //#FEE99A',
  progBar2: '#f09560', //#FEBE98',
  progBar3: '#49a4ff', //#1E90FF',

  btn: '#38e9bb', //#f26430'
  btnTxt: '#1f1147', //'#1f1147',
  counter: '#32167c', //'#171926',

  topNavIcon: '#fff',
};

export const SIZES = {
  base: 10,
  width,
  height,
};
