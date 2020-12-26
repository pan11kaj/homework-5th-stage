import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
export default class CheckHomeWork extends React.Component{
constructor(){
    super();
    this.state={
      email:firebase.auth().currentUser.email,getHomeWorks:[],
      ans1:'',ans2:'',ans3:''
    }
    this.requestRef=null
}
getStudentsHomeWorks=()=>{
 this.requestRef = db.collection('submitted_homeworks').where('send_homeworkto','==',this.state.email)
  .onSnapshot(snapshot=>{
   var details =  snapshot.docs.map(doc=> doc.data())
   this.setState({
       getHomeWorks:details
   })
  })
}
componentDidMount(){
    this.getStudentsHomeWorks()
}
key=(item,i)=>i.toString()
renderItem=({item,i})=>{
    return(
        <ListItem
        key={i}
        title={item.student_name+","+"has completed their homework"}
        subtitle={"class"+":-"+ item.grade+"\nSubject"+":-"+item.subject}
        titleStyle={{color:'#ff2052'}}
        subtitleStyle={{color:'#900c3f'}}
        leftElement={<Icon name="address-book-o" type="font-awesome"/>}
        rightElement={<TouchableOpacity style={{backgroundColor:'red',borderRadius:40,borderColor:'yellow',borderWidth:2}} onPress={()=>{this.props.navigation.navigate('seeanswer')}}><Text style={{textAlign:'center',color:'#ffff',fontSize:20}}>check</Text></TouchableOpacity>}
        bottomDivider
        />
    )
}

    render(){
        return(
            <View>
            <View>
                <MyHeader 
                title="check home-work"/>
            </View>
            <View>
                {
                    this.state.getHomeWorks.length ===0?(
            
                         <View>
                             <Text>your students has not completed homeworks</Text>
                         </View>
                     
                    ):(
                        <FlatList
                        keyExtractor={this.key}
                        data={this.state.getHomeWorks}
                        renderItem={this.renderItem}
                        />
                    )
                }
            </View>
            </View>
        )
    }
}