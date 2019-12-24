import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import HelpOrder from '~/pages/HelpOrder';
import HelpOrderDetail from '~/pages/HelpOrderDetail';
import HelpOrderNew from '~/pages/HelpOrderNew';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Checkin,
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  HelpOrderDetail,
                  HelpOrderNew,
                },
                {
                  defaultNavigationOptions: {
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              inactiveTintColor: '#999',
              activeTintColor: '#ee4e62',
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
