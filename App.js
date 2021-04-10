import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import MyProfileScreen from "./screens/MyProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AskLandfills from "./screens/AskLandfills";
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  MyProfileScreen: {screen: MyProfileScreen},
  AskLandfills: {screen: AskLandfills},
  Drawer: {screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator);