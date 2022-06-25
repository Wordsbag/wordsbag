import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Motivation from '../../assets/motivation.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CountdownTimer from '../countdownTimer/CountdownTimer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapState = ({wordBagReducer, localReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
  isLoading: wordBagReducer.loading,
  wordsBagId: localReducer.wordsBagId,
  timeOfCreation: localReducer.timeOfCreation,
});

const HomeStaticCard = () => {
  const {wordsBag, isLoading, wordsBagId, timeOfCreation} =
    useSelector(mapState);

  const THREE_DAYS_IN_MS = 8 * 60 * 60 * 1000;
  const NOW_IN_MS = timeOfCreation;
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleOfCard}>
          <Text style={[styles.titleOfCardTxt, styles.txtColor]}>
            Today Words Bag
          </Text>
          <Image source={Motivation} style={styles.imgOfTheCard} />
        </View>
        <View style={styles.statProgBarsWrapper}>
          <View style={styles.statProgBar}>
            <View style={styles.iconBox}>
              <FontAwesome5
                name="fire"
                style={{
                  color: '#0346FD',
                  fontSize: 25,
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            </View>

            <View style={styles.progBarContent}>
              <View style={styles.containerOfStatBar}>
                <View style={styles.containerOfStatBar}>
                  <Text style={[styles.txtColor]}>Nice Step</Text>
                  <Text style={[styles.txtColor]}>100%</Text>
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
                  ]}></View>
              </View>
            </View>
          </View>

          <View style={styles.statProgBar}>
            <View style={styles.iconBox}>
              <Ionicons
                name="bonfire"
                style={{
                  color: '#FD9203',
                  fontSize: 25,
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            </View>

            <View style={styles.progBarContent}>
              <View style={styles.containerOfStatBar}>
                <View style={styles.containerOfStatBar}>
                  <Text style={[styles.txtColor]}>Very Good Step</Text>
                  <Text style={[styles.txtColor]}>100%</Text>
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
                  ]}></View>
              </View>
            </View>
          </View>

          <View style={styles.statProgBar}>
            <View style={styles.iconBox}>
              <Ionicons
                name="logo-firefox"
                style={{
                  color: '#FF2525',
                  fontSize: 25,
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            </View>

            <View style={styles.progBarContent}>
              <View style={styles.containerOfStatBar}>
                <View style={styles.containerOfStatBar}>
                  <Text style={[styles.txtColor]}>Fantastic Step</Text>
                  <Text style={[styles.txtColor]}>72%</Text>
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
                  ]}></View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
      {/* // Complete Btn */}
      <TouchableOpacity
        style={styles.btnStartWrapper}
        onPress={() => console.warn('Lets Go')}>
        <Text style={styles.actionBtnText}> Complete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeStaticCard;

const styles = StyleSheet.create({
  btnStartWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 70,
    left: windowWidth / 2 - 110,
    backgroundColor: '#0077b6',
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 3,
    borderColor: '#27175D',
  },

  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  iconBox: {
    width: '20%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
    // backgroundColor: '#fff',
  },
  progBarContent: {
    width: '80%',
    // backgroundColor: 'green',
  },
  statProgBar: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'purple',
    alignItems: 'center',
    paddingVertical: 10,
  },
  progrBarElementIntern: {
    height: 16,

    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
  },
  progrBarElement: {
    width: '100%',
    height: 16,
    backgroundColor: '#fff',
    position: 'relative',
    borderRadius: 8,
    borderWidth: 0,

    marginLeft: 0,
  },

  // Nice Color:
  niceprogrBarElementColor: {
    borderColor: '#0346FD',
  },
  niceProgBarColorIntern: {
    backgroundColor: '#0346FD',
    width: '100%',
  },
  // VeryGOOD Color:
  veryGoodprogrBarElementColor: {
    borderColor: '#FD9203',
  },
  veryGoodProgBarColorIntern: {
    backgroundColor: '#FD9203',
    width: '100%',
  },
  //Fantastic Color:
  fantasticprogrBarElementColor: {
    borderColor: '#FF2525',
  },

  fantasticProgBarColorIntern: {
    backgroundColor: '#FF2525',
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
    fontSize: 20,
  },
  titleOfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  txtColor: {
    color: '#fff',
    fontSize: 16,
  },
  // progrBarElement: {},
  imgOfTheCard: {
    width: 50,
    height: 50,
  },
  container: {
    backgroundColor: '#27175D',
    width: '90%',
    marginLeft: windowWidth / 20,
    height: 320,
    paddingHorizontal: windowWidth / 15,
    paddingVertical: 20,
    borderRadius: 16,
  },
});
