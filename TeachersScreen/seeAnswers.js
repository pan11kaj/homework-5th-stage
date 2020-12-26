import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class SeeAnswers extends Component{
    constructor(){
        super();
        this.state={
            getHW:[],email:firebase.auth().currentUser.email,feedback:"",recieveremail:'',subject:'',name:''
        }
        this.requestRef = null;
    }
getteachersDetails=()=>{
    db.collection('teachers').where('email','==',this.state.email)
    .onSnapshot(snapshot=>{
        snapshot.docs.map(doc=>{
            this.setState({
                name:doc.data().teacher
            })
        })
    })
}

    getAnswers=()=>{
        this.requestRef = db.collection('submitted_homeworks').where('send_homeworkto','==',this.state.email)
         .onSnapshot(snapshot=>{
          var details   =     snapshot.docs.map(doc=> doc.data())
          var email     =     snapshot.docs.map(doc=>doc.data().email)
          var sb = snapshot.docs.map(doc=>doc.data().subject)
          this.setState({
              getHW:details,
            recieveremail:email,
          })
         })
       }
    
componentDidMount(){
    this.getAnswers()
    this.getteachersDetails()
}
sendfeedback=()=>{
  if(this.state.feedback === ''){
  Alert.alert('please give feedback')
  }else{

    db.collection('all_feedback').add({
        'feedback':this.state.feedback,
        'send_to':this.state.recieveremail,
        'teacher_email':this.state.email,
    
    })

    this.setState({
        feedback:''
    })
    this.props.navigation.navigate('tab2')
 return Alert.alert('home-work checked !!')
  }
    
  
}

key=(item,index)=>index.toString()
renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        title={"hear is the "+""+item.student_name+"'s answers"}
        subtitle={"answer1:-"+item.ans_1+"\nanswer2:-"+item.ans_2+"\nanswer3:-"+item.ans_3}
        titleStyle={{textAlign:'center',alignItems:'center',marginLeft:'20%',color:'#ccff99'}}
        subtitleStyle={{color:'violet',fontSize:23}}
        checkmark

        bottomDivider
        />
    )
}

    render(){
        return(
  <View>
      <View>
          <MyHeader
          title="Check Home works"
          />
      </View>
      <View>
      <FlatList
keyExtractor={this.key}
data={this.state.getHW}
renderItem={this.renderItem}
/>
<TextInput
placeholder="send feedback"
multiline
onChangeText={text=>this.setState({feedback:text})}
style={{borderWidth:6,borderRadius:40,borderBottomColor:'red',marginTop:20,textAlign:'center',height:100,fontSize:15,borderTopColor:'green',borderLeftColor:'yellow',borderRightColor:'blue'}}
value={this.state.feedback}
/>
<TouchableOpacity style={{alignItems:'center',marginTop:30,backgroundColor:'red',borderRadius:30,borderWidth:3,borderRadius:40,borderBottomColor:'gray',marginTop:20,textAlign:'center',fontSize:15,borderTopColor:'green',borderLeftColor:'yellow',borderRightColor:'blue'}}
onPress={()=>{
    this.sendfeedback()
}}

><Text style={{fontSize:19,color:'pink'}}>Home Work checked</Text></TouchableOpacity>
      </View>

</View>
        )
    }
}