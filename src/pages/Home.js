import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen';
import Loop from '../Loop/Loop';
import Extra from './Extra';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon, {Icons} from '../constants/Icons';
const Tab = createMaterialTopTabNavigator();
const Colors = [(primary = '#03045e')];
const TabArr = [
  {
    route: 'HomeScreen',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'grid',
    inActiveIcon: 'grid-outline',
    component: HomeScreen,
    display: 'flex',
  },
  {
    route: 'Test',
    label: 'Test',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'heart-plus',
    inActiveIcon: 'heart-plus-outline',
    component: Extra,
    display: 'none',
  },
  {
    route: 'Search',
    label: 'Search',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'timeline-plus',
    inActiveIcon: 'timeline-plus-outline',
    component: Extra,
    display: 'flex',
  },
  {
    route: 'Account',
    label: 'Account',
    type: Icons.FontAwesome,
    activeIcon: 'user-circle',
    inActiveIcon: 'user-circle-o',
    component: Extra,
    display: 'flex',
  },
];
const Home = () => {
  return (
    // <Tab.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}>
    //   <Tab.Screen name="HomeScreen" component={HomeScreen} />
    //   <Tab.Screen
    //     options={{tabBarStyle: {display: 'none'}}}
    //     name="Extra"
    //     component={Loop}
    //   />
    // </Tab.Navigator>

    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          position: 'absolute',
          top: 0,
          height: 6,
          backgroundColor: '#48cae4',
        },
        tabBarItemStyle: {flexDirection: 'row'},
        // tabBarStyle: { backgroundColor: 'powderblue' },
        // tabBarScrollEnabled: true,
        tabBarActiveTintColor: '#48cae4',
        tabBarInactiveTintColor: '#03045e',
      }}>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            component={_.component}
            options={{
              tabBarIcon: ({color, size, focused}) => (
                <Icon
                  name={focused ? _.activeIcon : _.inActiveIcon}
                  type={_.type}
                  size={size}
                  color={color}
                />
              ),
              tabBarStyle: {display: _.display},
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
