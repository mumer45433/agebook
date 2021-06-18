import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text,TouchableOpacity,Image,StatusBar} from 'react-native';

import LoginButton from '../components/LoginButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Creating Login Activity.
export default class forgetpassScreen extends Component { 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      email: '',
  
 
    }
 
  }
 
  login=()=>{
    
    let uploaddata = new FormData();
           let email = this.state.email
      
           if(email=="")
           {
             alert("email feild is empty")
           }
          
           else
           {
           console.log("email =>",email)
         

           uploaddata.append('email',email);
          
           //uploaddata.append('fcm_token',this.state.token);
  
    let api = 'http://192.168.1.3/Api/testing.php?action=email_user';
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
                let id = response.response[0].id
                let Email = response.response[0].email
                let Password = response.response[0].password
                console.log("c njsn",id)
                console.log("jscsnsns",Email)
                console.log("sjnjlsn",Password)
              this.props.navigation.navigate("forgetPassword", { id: id,Email:Email,Password:Password})
               
            }  
               
        })
        .catch((error) => {
            console.error(error);
        
        });
      }
     
}
  render() {
    const { navigation } = this.props;
    return (


      
 
      <View style={styles.container}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "transparent" />
    {/* <View style={{height:200,backgroundColor:'#28ade5',width:'100%',borderRadius:20,marginTop:-20     }}>
    <Image style={styles.avatar}
                 source={require('../assets/wq.jpg')}/>

                 
      </View> */}


      <Text style={{fontSize:29,fontWeight:'bold',marginTop:30}}>Please Enter your Email Address!</Text>
      <Text style={{fontSize:20,color:'gray'}}>for changing password</Text>

<View style={{padding:20}}>
    
<View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
      <MaterialIcons name="person" size={30} color="gray" />
      </View>
        <TextInput
        placeholder="Email"
        style={styles.input}
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={email => this.setState({email})}
        autoCorrect={false}
        
        />
       </View>
       <LoginButton  onPress={()=>{this.login()}}  >
        Login 
          </LoginButton>
    
<View >



          </View>
    </View>
   
  
    </View>

            
    );
  }
}
 
forgetpassScreen.navigationOptions = navData => {
  return {
    headerShown: false,
    headerTitle: 'Login to your Account',
  };
      };

// Creating Profile activity.


const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,

},
textInput:{
  borderWidth:2
},
inputContainer: {
  marginTop: 5,
  marginBottom: 10,
  width: '90%',
  height: 53,
  borderColor: '#28ade5',
  borderRadius: 3,
  borderWidth: 2,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor:'#f4f0f1',
  
  borderRadius:33
},
input: {
  padding: 10,
  flex: 1,
  fontSize: 16,


  justifyContent: 'center',
  alignItems: 'center',
},

avatar: {
  width: 70,
  height: 70,
  borderRadius: 35,
  borderWidth: 2,
  borderColor: "white",
  marginTop:115,
  marginHorizontal:143
},
iconStyle: {
  padding: 10,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  width: 50,
},

 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 },
   container: {
    justifyContent: 'center',
    alignItems: 'center',
 
  
  },
  logo: {
    height: 220,
    width: 200,
    resizeMode: 'cover',
  },

    buttonContainer: {
      marginTop: 10,
      width: '100%',
   
      backgroundColor: '#28ade5',
     
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
   
    },
    tt:{
width:'100%',
height:170,
resizeMode:'stretch'
    },
 
  text: {
 
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1769b2',
 
  },
});