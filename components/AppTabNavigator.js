import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import GiveScreen from '../screens/GiveScreen';
import AskScreen from '../screens/AskScreen';
import {AppStackNavigator} from './AppStackNavigator';


export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate Items",
    }
  },
  BookRequest: {
    screen: AskScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Ask Items",
    }
  }
});
