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

export default class MyProfileScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            email: firebase.auth().currentUser.email,
            firstName: '',
            lastName: '',
            contact: '',
            address: ''
        }
    }

    getUserDetails = () => {
        db.collection("users").where("email_id","==",this.state.email).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        firstName: doc.data().first_name,
                        lastName: doc.data().last_name,
                        contact: doc.data().contact,
                        address: doc.data().address
                    })
                })
            })
    }

    signout=()=>{
        Alert.alert(
            "Are you sure you want to log out",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => {console.log("Cancel")}
                },
                {
                    text: "OK",
                    onPress: () => {console.log("OK")}
                }
            ]
        );
        this.props.navigation.navigate('WelcomeScreen')
        firebase.auth().signOut()
    }

    
    /*updateUserDetails = () => {
        db.collection("users").where("email_id","==",this.state.email).update({
            
        })
    }*/

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style={{flex: 1,backgroundColor: '#B4F5F0'}}>
                <View>
                    <Header 
                        backgroundColor="#041F60"
                        centerComponent={{
                            text:"My Profile",
                            style:{ color: 'white',fontSize: 27 }
                        }} />
                </View>
                <TextInput 
                    style={ styles.inputBox } 
                    placeholder="firstName" 
                    onChangeText={(text)=>{
                        this.setState({ firstName: text })
                    }}
                    value={this.state.firstName} />
                <TextInput 
                    style={ styles.inputBox } 
                    placeholder="Last Name" 
                    onChangeText={(text)=>{
                        this.setState({ lastName: text })
                    }}
                    value={this.state.lastName} />
                <TextInput 
                    style={ styles.inputBox } 
                    placeholder="Contact" 
                    onChangeText={(text)=>{
                        this.setState({ contact: text })
                    }}
                    value={this.state.contact} />
                <TextInput 
                    style={ styles.inputBox } 
                    placeholder="address" 
                    onChangeText={(text)=>{ 
                        this.setState({ address: text })
                    }}
                    value={this.state.address} />

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={()=>{
                        this.updateUserDetails();
                    }} >
                    <Text style={{color: 'white',fontSize: 20}}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{width: '40%'}]} 
                    onPress={()=>{
                        this.signout();
                    }}>
                    <Text style={{color: 'white',fontSize: 20}}>Log out</Text>
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