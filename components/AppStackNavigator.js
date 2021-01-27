import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';

import {createStackNavigator} from 'react-navigation-stack'
import GiveScreen from '../screens/GiveScreen'
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreens'

export const AppStackNavigator = createStackNavigator({
    GiveList:{
        screen:GiveScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ReceiverDetails:{
        screen:ReceiverDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    }
},
{
    initialRouteName:'GiveList'
}
)
