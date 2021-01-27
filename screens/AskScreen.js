import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class AskScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      requestId:'',
      requestedBookName:'',
      bookStaus:'',
      docId:'',
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  getBookRequest=()=>{
    var bookRequest = db.collection('requested_books').where('user_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().book_status!=='received'){
          this.setState({
            requestId:doc.data().request_id,
            requestedBookName:doc.data().book_name,
            bookStaus:doc.data().book_status,
            docId:doc.id
          })
        }
      })
    })
  }

  addRequest = async(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        'date':firebase.firestore.FieldValue.serverTimestamp()
    })
    await this.getBookRequest()
    db.collection('users').where('email_id','==',userId).get()
    .then().then((snapshot)=>{
      snapshot.forEach(()=>{
        db.collection('users').doc(doc.id).update({
          isBookRequestActive:true
        })
      })
    })

    this.setState({
        bookName :'',
        reasonToRequest : ''
    })

    return Alert.alert("Item Requested Successfully")
  }


  render(){
    return(
        <View style={{flex:1}}>
          <MyHeader title="Request Item"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter Item name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the item"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'red',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"blue",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
