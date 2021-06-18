import React, { useState,useEffect } from 'react';

import { View, Text, ImageBackground,StyleSheet,Image, TextInput,Button } from 'react-native';
import LoginButton from '../components/LoginButton';
import TextInpu from '../components/TextInpu';

import axios from 'axios'


const formScreen=({navigation})=>{

  const { UserEmail }  = this.state ;
  const { UserPassword }  = this.state ;

  fetch('https://reactnativecode.000webhostapp.com/User_Login.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      email: UserEmail,
   
      password: UserPassword
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
   
          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
   
              //Then open Profile activity and send user email to profile activity.
              this.props.navigation.navigate('Second', { Email: UserEmail });
   
          }
          else{
   
            Alert.alert(responseJson);
          }
   
        }).catch((error) => {
          console.error(error);
        });
   
    


  return(
  

    <View style={styles.container}>
     
    
    
      <TextInpu
      placeholder="user"
      placeholderTextColor='#6CCBB0'
      onChangeText={userNameHandler}
      />
       <TextInpu
      placeholder="email"
      placeholderTextColor='#6CCBB0'
      onChangeText={(text)=> setEmail(text)}
      />
        <TextInpu
      placeholder="Password"
      placeholderTextColor='#6CCBB0'
      onChangeText={(text)=> setPassword(text)}
      />
     
   <View style={{marginLeft:-92}}>
      <LoginButton
      onPress={() => setSubmit(true)}
      >Register</LoginButton>
</View> 

         
     


    </View>
    
  )
}

const styles=StyleSheet.create({


  image:{
    resizeMode: "center",
    height: '100%',
    width: '100%'
  },
  textage:{
    height: '14%',
    width: '80%',
    marginBottom:30,
    resizeMode: "center",
  },
  container:{
    flex:1,
   marginTop:106,
    alignItems:'center',
    padding:14
  },
  TextContainer:{
    
    color: 'white',
   
    fontSize: 18,
  },
  TextView:{
    margin:20
  }
})

export default formScreen;