import React, { Component } from 'react';
import {View,Text,Modal, TextInput,TouchableOpacity,StyleSheet, ScrollView,Alert,FlatList,} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../MyHeader';
import { Icon, ListItem  } from 'react-native-elements';

export default class MyFeedbacks extends Component{
constructor(){
    super();
    this.state={
        email:firebase.auth().currentUser.email
    }
}


    render(){
        return(
            <View>

            </View>
        )
    }
}