import * as React from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Modal, 
    ScrollView, 
    KeyboardAvoidingView, 
    Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor(){
      super();
      this.state={
              emailId:'',
              password:'',
              firstName:'',
              lastName:'',
              address:'',
              contact:'',
              confirmPassword:'',
              modalEmailId:'',
              modalPassword:'',
              isModalVisible:'false'
      }
  }

  userSignUp = (emailId,password,confirmPassword) => {
      if(password!==confirmPassword){
          Alert.alert("password doesn't match\nCheck your password.")
      } else {
          firebase.auth().createUserWithEmailAndPassword(emailId,password)
          .then(()=> {
              db.collection('users').add({
                  "first_name":this.state.firstName,
                  "last_name":this.state.lastName,
                  "contact":this.state.contact,
                  "email_id":this.state.emailId,
                  "address":this.state.address,
                })
                return  Alert.alert(
                      'User Added Successfully',
                      '',
                      [
                        {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                      ]
                  );
          })
          .catch((error)=> {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              return Alert.alert(errorMessage)
          });
      }
  }

  userSignIn(emailId,password){
      firebase.auth().signInWithEmailAndPassword(emailId, password)
      .then(()=>{
          this.props.navigation.navigate('Drawer')
      })
      .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorCode,errorMessage)
      })
  }

  showModal = () => {
      return(
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
            <View style={styles.modalContainer}>
              <ScrollView style={{width:'100%'}}>
                <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text
                  style={styles.modalTitle}
                  >Registration</Text>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Contact"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Address"}
                  multiline = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                  }}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Email"}
                  keyboardType ={'email-address'}
                  onChangeText={(text)=>{
                    this.setState({
                      modalEmailId: text
                    })
                  }}
                /><TextInput
                  style={styles.formTextInput}
                  placeholder ={"Password"}
                  secureTextEntry = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      modalPassword: text
                    })
                  }}
                /><TextInput
                  style={styles.formTextInput}
                  placeholder ={"Confrim Password"}
                  secureTextEntry = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      confirmPassword: text
                    })
                  }}
                />
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={()=>
                      this.userSignUp(this.state.modalEmailId, this.state.modalPassword, this.state.confirmPassword)
                    }
                  >
                  <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBackButton}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={()=>this.setState({"isModalVisible":false})}
                  >
                  <Text style={{color:'#ff5722'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </Modal>
      )
  }

  render(){
    return (
        <View style={{flex: 1,backgroundColor: '#2CEEF0'}}>
            <View>
                {
                    this.showModal()
                }
            </View>
            <Text style={styles.title}>Landfills</Text>
            <TextInput 
                style={ styles.inputBox } 
                placeholder="email Id" 
                onChangeText={(text)=>{
                  this.setState({ emailId: text })
                }}
                keyboardType={"email-address"} />
            <TextInput 
                style={ styles.inputBox } 
                placeholder="password"
                onChangeText={(text)=>{
                  this.setState({ password: text })
                }}
                secureTextEntry={true} />
            <TouchableOpacity style={styles.button}
                onPress={()=>{this.userSignIn(this.state.emailId,this.state.password);}} >
                <Text style={{color: 'white',fontSize: 20}}>
                    Sign in
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button} 
                onPress={()=>{this.setState({ isModalVisible: true })}}>
                <Text style={{color: 'white',fontSize: 20}}>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginTop: 65,
        textAlign: 'center',
        color: '#0476D0',
        fontWeight: 'bold'
    },
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
        marginTop: 40,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#041F60',
        borderRadius: 20,
        height: '5%',
        paddingTop: '1%',
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:40
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
})