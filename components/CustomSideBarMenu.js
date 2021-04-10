import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';

export default class CustomSideBarMenu extends React.Component{
    constructor(){
      super();
      this.state = {
        name: ''
      }
    }
  
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props} />
                </View>
            </View>
        )
    }
}
  
var styles = StyleSheet.create({
    container : {
        flex:1
    },
    drawerItemsContainer:{
        marginTop: 30,
        flex:0.8
    },
})