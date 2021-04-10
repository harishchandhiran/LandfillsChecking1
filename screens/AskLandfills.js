import * as React from 'react';
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    Alert } from 'react-native';
import { Header } from "react-native-elements";
import db from '../config';
import firebase from 'firebase';

export default class AskLandfills extends React.Component {
    constructor(){
        super();
        this.state = {
            email: firebase.auth().currentUser.email,
            quantity: '',
            address: ''
        }
    }

    sendRequest = (quantity,address) => {
        if(address === '' && quantity === ''){
            Alert.alert("Fill the blacks","")
        } else if(address === ''){
            Alert.alert("Give the address to deliver landfills","")
        } else if(quantity === ''){
            Alert.alert("Give the quantity of landfills","")
        } else{
            db.collection("requests").add({
                "requester": this.state.email,
                "quantity": quantity + "kg",
                "address": address
            })
        }
    }

    render(){
        return (
            <View style={{flex: 1,backgroundColor: '#B4F5F0'}}>
                <View>
                    <Header 
                        backgroundColor="#041F60"
                        centerComponent={{
                            text:"Ask landfills",
                            style:{ color: 'white',fontSize: 27 }
                        }} />
                </View>
                <TextInput 
                    style={ styles.inputBox } 
                    placeholder="Quantity(in kg)" 
                    keyboardType="numeric"
                    onChangeText={(text)=> {
                        this.setState({
                            quantity: text
                        })
                    }} />
                <TextInput style={ styles.inputBox } 
                    placeholder="Address" 
                    onChangeText={(text)=>{
                        this.setState({
                            address: text
                        })
                    }} />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={()=>{
                        this.sendRequest(this.state.quantity,this.state.address);
                    }}>
                    <Text style={{color: 'white',fontSize: 20}}>Ask</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        width: '80%',
        marginTop: 40,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottomWidth: 4,
        borderColor: '#464033',
        fontSize: 23
    },
    button: {
        marginTop: 50,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#041F60',
        borderRadius: 20,
        height: '5%',
        paddingTop: '1%',
    }
})