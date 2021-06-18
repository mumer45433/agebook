import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image, TextInput,Button ,TouchableOpacity,AsyncStorage} from 'react-native';
import LoginButton from '../components/LoginButton';
import TextInpu from '../components/TextInpu';


export default class loginScreen extends Component { 


  constructor(props) {
 
    super(props)
 
    this.state = {
 
      email: '',
      password: ''
 
    }
 
  }
 
  login=()=>{
    
    let uploaddata = new FormData();
           let email = this.state.email
           let password = this.state.password
           if(email=="")
           {
             alert("email feild is empty")
           }
           else if(password=="")
           {
             alert("password feild is empty")
           }
           else
           {
           console.log("email =>",email)
           console.log("password =>",password)

           uploaddata.append('email',email);
           uploaddata.append('password',password);
           //uploaddata.append('fcm_token',this.state.token);
  
    let api = 'http://192.168.10.10/Api/testing.php?action=login_user';
    console.log("pass => ", api)
    fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "otherHeader": "foo",
            },
            body: uploaddata,
        })
        .then((response) => response.json())
        .then((response) => {
          console.log("response",response)
          
            if (response.response == "fail") {
                alert("Username or password is  incorrect")
            }
            else {
              AsyncStorage.setItem('customer', JSON.stringify(response.response));
              this.props.navigation.navigate("RootStack")
                
            }           
        })
        .catch((error) => {
            console.error(error);
        
        });
      }
     
}


  render() {

    const { navigation } = this.props;



  return(
    <ImageBackground source={require('../assets/splashscreen.png')}
    style={styles.image}>


    <View style={styles.container}>
     
      <Image source={require('../assets/agetext.png')}
      style={styles.textage}/>
      
    
      <TextInpu
      placeholder="Username"
      placeholderTextColor='#6CCBB0'
      onChangeText={email => this.setState({email})}
      />
       <TextInpu
      placeholder="Password"
      placeholderTextColor='#6CCBB0'
      onChangeText={password => this.setState({password})}
      />
   
   <View style={{marginLeft:-92}}>
      <LoginButton
      onPress={()=>{this.login()}} 
      >Login</LoginButton>
</View> 

      <View style={styles.TextView}>
      <TouchableOpacity onPress={() => navigation.navigate('signUpScreen')}>
      <Text style={styles.TextContainer}>Not yet registered? Sign Up</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity   onPress={()=> navigation.navigate("forgetpassScreen")}>
      <Text style={styles.TextContainer}>Forget Password?</Text>
      </TouchableOpacity>
    
         
     


    </View>
    </ImageBackground>
  )
}
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