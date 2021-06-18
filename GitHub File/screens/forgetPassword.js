import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text,TouchableOpacity,Image,StatusBar} from 'react-native';

import LoginButton from '../components/LoginButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Creating Login Activity.
export default class forgetPassword extends Component { 




    constructor(props) { 

        super(props);
    
        this.state = {
          Email: '',
          Password: '',
         
        }
      }
    
    
    
      Update_Data=()=>{
         

        let uploaddata = new FormData();
        let email = this.state.Email
        let password = this.state.Password
      
        console.log("email =>",email)
        console.log("password =>",password)

        uploaddata.append('email',email);
        uploaddata.append('password',password);
        uploaddata.append('id', this.props.route.params.id);
        console.log("shghs000000000000",id)

        //uploaddata.append('fcm_token',this.state.token);
    
      
        let api = 'http://192.168.1.3/Api/testing.php?action=update_user';
        console.log("pass => ", api)
        fetch(api, { 
                method: 'POST',
                headers: {
                  "Content-Type": "multipart/form-data",
                  "otherHeader": "foo",
                },
                body: uploaddata, 
             
            })
            .then((response) => response.text())
            .then((response) => {
              console.log("response",response)
             
                   
            })
            .catch((error) => {
                console.error(error);
            
            });
            this.props.navigation.navigate('loginScreen');
          
          
    }



    componentDidMount() {

      this.setState({ 
         
        id: this.props.route.params.id,
        Email: this.props.route.params.Email,
        Password: this.props.route.params.Password,
       
      })
      const id = this.props.route.params.id;  
      console.log("id=>",id)
    }
    

 


  render() {



    
 
    return (


      
 
      <View style={styles.container}>
     <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "transparent" />
    {/* <View style={{height:200,backgroundColor:'#28ade5',width:'100%',borderRadius:20,marginTop:-20     }}>
    <Image style={styles.avatar}
                 source={require('../assets/wq.jpg')}/>

                 
      </View> */}


      <Text style={{fontSize:29,fontWeight:'bold',marginTop:30}}>Change Your Password!</Text>
      <Text style={{fontSize:20,color:'gray'}}>for changing password</Text>

<View style={{padding:20}}>
    
<View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
      <MaterialIcons name="person" size={30} color="gray" />
      </View>
        <TextInput
        placeholder="Email"
        style={styles.input}
       
       
     
        value={this.state.Email}
       onChangeText={text => this.setState({Email:text})}
      
        
        />
       </View>

       <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
      <MaterialIcons name="person" size={30} color="gray" />
      </View>
        <TextInput
        placeholder="New Password"
        style={styles.input}
   
     
       
      
        onChangeText={text => this.setState({Password:text})}
        
        />
       </View>
    
<View >

<LoginButton  onPress={()=>{this.Update_Data()}}  >
        Login 
          </LoginButton>

          </View>
    </View>
   
  
    </View>

            
    );
  }
}
 
forgetPassword.navigationOptions = navData => {
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