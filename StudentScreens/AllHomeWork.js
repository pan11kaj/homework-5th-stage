import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,FlatList,} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem  } from 'react-native-elements';
export default class HomeWorks extends Component{
    constructor(){
        super();
        this.state={
        allDetails:[],gd:'',section:'',studentName:'',email:firebase.auth().currentUser.email
        }
        this.requestRef = null
    }
    getStudentDetails(){
        db.collection('students').where('email','==',this.state.email)
        .onSnapshot((snapshot)=>{
      snapshot.docs.map(doc=>{
        this.setState({
            gd:doc.data().grade
            
            })
      })
            
        console.log(this.state.gd)
        })
                
    
         
    }
getHW =()=>{
    this.requestRef = db.collection("all_homeworks")
    .onSnapshot((snapshot)=>{
      var requestedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        allDetails :requestedBooksList
      });
      console.log(this.state.allDetails)
    })  
  }
componentDidMount(){
this.getHW()
this.getStudentDetails()
}
keyExtractor=(item,index)=>index.toString()
renderItem=({item,index})=>{
    return(
        <ListItem
        key={index}
        title={item.class}
        subtitle={item.subject}
        titleStyle={{color:'red',fontSize:20,marginTop:20}}
        leftAvatar={<Icon name="book" type="font-awesome" />}
        rightElement={<TouchableOpacity style={{borderWidth:2,borderColor:'red'}}onPress={()=>this.props.navigation.navigate('homework')}><Text>do homework</Text></TouchableOpacity>}
        bottomDivider
    
        />
    )
}


    render(){
        return(
   
    <View style={{flex:1}}>
        <View>
            <MyHeader
            title="All Home-Works"
            />
        
        </View>
      
        <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDetails}
                renderItem={this.renderItem}
              />
        </View>
    
        )
    }
}