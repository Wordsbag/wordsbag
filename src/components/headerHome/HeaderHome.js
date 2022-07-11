import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addWordToBag} from '../../redux/WordBag/wordbag.actions';
import {useNavigation} from '@react-navigation/native';
const mapState = ({wordBagReducer}) => ({
  wordsBag: wordBagReducer.wordsBag,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderHome = () => {
  const navigation = useNavigation();
  const {wordsBag} = useSelector(mapState);
  const dispatch = useDispatch();

  return (
    <View>
      {/* <View style={styles.profileBar}>
        <Text style={styles.profileBadge}>P</Text>
        <Ionicons
          name="notifications"
          style={{
            color: '#0077b6',
            fontSize: 25,
          }}
        />
      </View> */}
      <View style={styles.headerBox}>
        <View style={styles.textBox}>
          <Text style={styles.mainText}>Hello Oussama</Text>
          <Text style={styles.secondText}>Add 12 words to your Bag</Text>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              navigation.navigate('Loop');
            }}>
            <Text style={styles.actionBtnText}>Join Session</Text>
          </TouchableOpacity>
          {/* <View style={styles.counterDesign}>
            <Text style={styles.counterDesignTxt}>{wordsBag.length}/12</Text>
          </View> */}
        </View>
        <View style={styles.imageStyle}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://clipart.world/wp-content/uploads/2020/08/a-school-bag-png-transparent.png',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  counterDesign: {
    backgroundColor: '#ade8f4',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  counterDesignTxt: {
    color: '#03045e',
    fontSize: 18,
  },
  profileBadge: {
    height: 30,
    width: 30,
    backgroundColor: '#0077b6',
    color: 'white',
    fontSize: 20,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
  },
  profileBar: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerBox: {
    height: 200,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#0077b6',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textBox: {
    width: '70%',
  },
  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ade8f4',
  },
  secondText: {
    color: '#ade8f4',
    marginBottom: 5,
  },

  actionBtn: {
    padding: 10,
    paddingHorizontal: 15,
    width: 120,
    backgroundColor: '#ade8f4',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  actionBtnText: {
    color: '#03045e',
    fontSize: 14,
  },
  imageStyle: {
    // backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
