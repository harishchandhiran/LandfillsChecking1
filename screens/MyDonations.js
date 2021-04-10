import * as React from 'react';
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Stylesheet, 
    Flatlist } from 'react-native';
import { Header } from 'react-native-elements';

export default class MyDonations extends React.Component {
    render(){
        return (
            <View>
                <Header 
                        backgroundColor="#041F60"
                        centerComponent={{
                            text:"My Donations",
                            style:{ color: 'white',fontSize: 27 }
                        }} />
            </View>
        )
    }
}
