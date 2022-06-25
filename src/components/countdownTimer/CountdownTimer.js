import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useCountdown} from '../hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ExpiredNotice = () => {
  return (
    <View style={styles.expiredNotice}>
      <Text>Expired!!!</Text>
      <Text>Please select a future date and time.</Text>
    </View>
  );
};

const ShowCounter = ({days, hours, minutes, seconds}) => {
  return (
    <View style={styles.showCounter}>
      <Text style={styles.countdownLink}>
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        {/* <Text style={styles.timeStyle}>:</Text> */}
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        {/* <Text style={styles.timeStyle}>:</Text> */}
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        {/* <Text style={styles.timeStyle}>:</Text> */}
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      </Text>
    </View>
  );
};

const CountdownTimer = ({targetDate}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};
export default CountdownTimer;

const styles = StyleSheet.create({
  showCounter: {
    backgroundColor: '#27175D',
    width: '90%',
    marginLeft: windowWidth / 20,
    height: 120,
    paddingHorizontal: windowWidth / 15,
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStyle: {
    fontSize: 26,
    color: '#fff',
  },
});
