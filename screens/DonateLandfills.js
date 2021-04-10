import * as React from 'react';
import { View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    FlatList } from 'react-native';
import { Header,ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class DonateLandfills extends React.Component {
    constructor(){
        super();
        this.state = {
            userId  : firebase.auth().currentUser.email,
            requestList : []
        }
        this.requestRef = null;
    }

    getRequestList = () => {
        this.requestRef = db.collection("requests")
            .onSnapshot((snapshot) => {
                var requestList = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    requestList: requestList
                })
            })
    }

    keyExtractor = (item,index) => index.toString()

    renderItem = ( {item,i} ) => {
        return (
            <ListItem 
                key={i} 
                title={item.requester} 
                subtitle={"quantity : " + item.quantity +"\naddress : " + item.address} 
                bottomDivider
                backgroundColor="green" />
        )
    }

    componentDidMount(){
        this.getRequestList();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return (
            <View>
                <Header 
                        backgroundColor="#041F60"
                        centerComponent={{
                            text:"Donate Landfills",
                            style:{ color: 'white',fontSize: 27 }
                        }} />
                <View style={{flex:1}}>
                    {
                        this.state.requestList.length === 0
                        ?(
                            <View style={styles.subtitle}>
                                <Text style={{ fontSize: 20}}>No requests</Text>
                            </View>
                        ):
                        (
                            <FlatList 
                                keyExtractor={this.keyExtractor}
                                data={this.state.requestList}
                                renderItem={this.renderItem} />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center',
    },
    subtitle :{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center',
        marginTop: '50%'
    }
})

/*
<View style={{flex:1}}>
    {
        this.state.requestList.length === 0
        ?(
            <View style={styles.subtitle}>
                <Text style={{ fontSize: 20}}>No requests</Text>
            </View>
        )
        :(
            <Flatlist
                keyExtractor={this.keyExtractor}
                data={this.state.requestList}
                renderItem={this.renderItem}
            />
        )
    }
</View>
*/