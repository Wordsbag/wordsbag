import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Motivation from '../../assets/motivation.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CountdownTimer from '../countdownTimer/CountdownTimer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapState = ({wordBagReducer, localReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
  isLoading: wordBagReducer.loading,
  wordsBagId: localReducer.wordsBagId,
  timeOfCreation: localReducer.timeOfCreation,
  step: localReducer.step,
});

const HomeStaticCard = () => {
  const navigation = useNavigation();
  const {wordsBag, isLoading, wordsBagId, timeOfCreation, step} =
    useSelector(mapState);
  const stepPercentage = step * 20;
  const THREE_DAYS_IN_MS = 10 * 8 * 60 * 60 * 1000;
  const NOW_IN_MS = timeOfCreation;
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
      }}>
      <ScrollView>
        <View style={styles.ourHeaderStyle}>
          <View style={styles.ourHeaderStyleRow}>
            <Text style={[styles.ourHeaderTxtStyle, styles.colorWhite]}>
              Hi Oussama
            </Text>
            <MaterialCommunityIcons
              name="hand-back-left"
              style={{
                color: 'yellow',
                fontSize: 20,
                marginLeft: 10,
                transform: [{rotateZ: '-20deg'}],
              }}
            />
          </View>
          <Text style={[styles.colorWhite, styles.headerSalute]}>
            Welcome Back, Let's Go
          </Text>
        </View>
        <CountdownTimer targetDate={dateTimeAfterThreeDays} />
        <View style={styles.container}>
          <View style={styles.titleOfCard}>
            <Text style={[styles.titleOfCardTxt]}>Today words bag</Text>
            {/* <Image source={Motivation} style={styles.imgOfTheCard} /> */}
          </View>
          <View style={styles.statProgBarsWrapper}>
            <View style={styles.statProgBar}>
              <View style={styles.iconBox}>
                <View
                  style={[
                    styles.overlayIcon,
                    {backgroundColor: COLORS.progBar1},
                  ]}></View>
                <FontAwesome5
                  name="fire"
                  style={{
                    color: COLORS.progBar1,
                    fontSize: 25,
                  }}
                />
              </View>

              <View style={styles.progBarContent}>
                <View style={styles.containerOfStatBar}>
                  <View style={styles.containerOfStatBar}>
                    <Text style={[styles.txtColor]}>Nice Step</Text>
                    {/* <Text style={[styles.txtColor]}>{step * 20}%</Text> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.progrBarElement,
                    styles.niceprogrBarElementColor,
                  ]}>
                  <View
                    style={[
                      styles.progrBarElementIntern,
                      styles.niceProgBarColorIntern,
                      {width: `${stepPercentage}%`},
                    ]}></View>
                </View>
              </View>
            </View>

            <View style={styles.statProgBar}>
              <View style={[styles.iconBox]}>
                <View
                  style={[
                    styles.overlayIcon,
                    {backgroundColor: COLORS.progBar2},
                  ]}></View>
                <Ionicons
                  name="bonfire"
                  style={{
                    color: COLORS.progBar2,
                    fontSize: 25,
                  }}
                />
              </View>

              <View style={styles.progBarContent}>
                <View style={styles.containerOfStatBar}>
                  <View style={styles.containerOfStatBar}>
                    <Text style={[styles.txtColor]}>Very Good Step</Text>
                    {/* <Text style={[styles.txtColor]}>{stepPercentage + 10}%</Text> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.progrBarElement,
                    styles.veryGoodprogrBarElementColor,
                  ]}>
                  <View
                    style={[
                      styles.progrBarElementIntern,
                      styles.veryGoodProgBarColorIntern,
                      {width: `${stepPercentage + 10}%`},
                    ]}></View>
                </View>
              </View>
            </View>

            <View style={styles.statProgBar}>
              <View style={styles.iconBox}>
                <View
                  style={[
                    styles.overlayIcon,
                    {backgroundColor: COLORS.progBar3},
                  ]}></View>
                <Ionicons
                  name="logo-firefox"
                  style={{
                    color: COLORS.progBar3,
                    fontSize: 25,
                  }}
                />
              </View>

              <View style={styles.progBarContent}>
                <View style={styles.containerOfStatBar}>
                  <View style={styles.containerOfStatBar}>
                    <Text style={[styles.txtColor]}>Fantastic Step</Text>
                    {/* <Text style={[styles.txtColor]}>{stepPercentage + 40}%</Text> */}
                  </View>
                </View>
                <View
                  style={[
                    styles.progrBarElement,
                    styles.fantasticprogrBarElementColor,
                  ]}>
                  <View
                    style={[
                      styles.progrBarElementIntern,
                      styles.fantasticProgBarColorIntern,
                      {width: `${stepPercentage + 40}%`},
                    ]}></View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* // Complete Btn */}
        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}> */}

        {/**/}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
        }}>
        <TouchableOpacity
          style={styles.btnStartWrapper}
          onPress={() => navigation.navigate('Loop')}>
          <Text style={styles.actionBtnText}> GO !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeStaticCard;

const styles = StyleSheet.create({
  headerSalute: {
    fontSize: 18,
    fontWeight: '500',
  },
  colorWhite: {
    color: '#fff',
  },
  ourHeaderStyle: {
    marginBottom: 24,
    marginTop: 10,
  },
  ourHeaderTxtStyle: {
    fontSize: 16,
    marginBottom: 5,
  },
  ourHeaderStyleRow: {
    flexDirection: 'row',
  },
  overlayIcon: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
    position: 'absolute',
    borderRadius: 6,
  },
  btnStartWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // left: windowWidth / 10,
    // paddingVertical: 18,
    // width: '80%',
    backgroundColor: COLORS.btn,
    height: 80,
    width: 80,
    borderRadius: 40,
    // position: 'absolute',
    // bottom: 0,
    // marginTop: 10,
  },

  actionBtnText: {
    color: COLORS.btnTxt,
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  iconBox: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,

    marginRight: 20,
  },
  progBarContent: {
    width: '80%',
    // backgroundColor: 'green',
    // height: '100%',
    // justifyContent: 'space-around',
    borderRadius: 10,
  },
  statProgBar: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'purple',
    alignItems: 'center',
    paddingVertical: 10,
  },
  progrBarElementIntern: {
    height: 5,

    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
  },
  progrBarElement: {
    width: '100%',
    height: 5,
    backgroundColor: COLORS.border,
    position: 'relative',
    borderRadius: 4,
    borderWidth: 0,

    marginLeft: 0,
  },

  // Nice Color:
  niceprogrBarElementColor: {
    borderColor: COLORS.progBar1,
  },
  niceProgBarColorIntern: {
    backgroundColor: COLORS.progBar1,
    width: '100%',
  },
  // VeryGOOD Color:
  veryGoodprogrBarElementColor: {
    borderColor: COLORS.progBar2,
  },
  veryGoodProgBarColorIntern: {
    backgroundColor: COLORS.progBar2,
    width: '100%',
  },
  //Fantastic Color:
  fantasticprogrBarElementColor: {
    borderColor: COLORS.progBar3,
  },

  fantasticProgBarColorIntern: {
    backgroundColor: COLORS.progBar3,
    width: '72%',
  },

  containerOfStatBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statProgBarsWrapper: {
    // backgroundColor: 'red',

    paddingBottom: 20,
  },
  titleOfCardTxt: {
    marginRight: 20,
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.txt,
  },
  titleOfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  txtColor: {
    color: COLORS.txt,
    fontSize: 14,
  },
  // progrBarElement: {},
  imgOfTheCard: {
    width: 50,
    height: 50,
  },
  container: {
    // backgroundColor: COLORS.background,
    width: '90%',
    // borderWidth: 2,
    // borderColor: COLORS.border,
    // marginLeft: windowWidth / 20,
    // height: 320,
    // paddingHorizontal: windowWidth / 15,
    // marginHorizontal: 20,

    marginTop: 20,
    borderRadius: 16,
  },
});
