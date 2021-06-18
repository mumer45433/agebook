import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image, TextInput,Button, ScrollView ,Picker} from 'react-native';

import LoginButton from '../components/LoginButton';
import TextInpu from '../components/TextInpu';
import DatePicker from 'react-native-datepicker'
import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';

import MyPicker from '../components/MyPicker';
import MynewPicker from '../components/MynewPicker';
import StatePicker from '../components/StatePicker';

var hobbies = [
  {label: "Male", value: 0},
  {label: "Female", value: 1},
  {label: "Other", value: 2},
];
 





export default class SignUpScreen extends Component { 


  constructor(props) {
 
    super(props)
 
    this.state = {
 
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      date: '2016-2-13',
      gender:'',
      country:'',
      city:'',
      state:'',
  
 
    }
 
  }

  



  login=()=>{
    
    
    let uploaddata = new FormData();
           let firstname = this.state.firstname
           let lastname = this.state.lastname
           let username = this.state.username
           let password = this.state.password
           let email = this.state.email
           let phone = this.state.phone
           let date = this.state.date
           let gender = this.state.gender
           let country = this.state.country
           let city = this.state.city
           let state = this.state.state
         
        
         
          
           console.log("email =>",email)
           console.log("password =>",password)

           uploaddata.append('firstname',firstname);
           uploaddata.append('lastname',lastname);
           uploaddata.append('username',username);
           uploaddata.append('password',password);
           uploaddata.append('email',email);
           uploaddata.append('phone',phone);
           uploaddata.append('date',date);
           uploaddata.append('gender',gender);
           uploaddata.append('country',country);
           uploaddata.append('city',city);
           uploaddata.append('state',state);
    
         
        
           //uploaddata.append('fcm_token',this.state.token);
  
    let api = 'http://192.168.10.11/Api/testing.php?action=sign_up';
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

            if (response.response == "fail") {
                alert("Username or password is  incorrect")
            }
            else {
             
              this.props.navigation.navigate("RootStack", { Email: email })   
            }        
        })
        .catch((error) => {
            console.error(error);
        });


      
       
       
        
}
genderchange(value)
{
  console.log(value)
  if(value==0)
  {
    this.setState({
      gender:'Male'
    })
  }
  else if(value==1)
  {
    this.setState({
      gender:'Female'
    })
  }
  else if(value==2)
  {
    this.setState({
      gender:'Other'
    })
  }
  else{
    
  }
}
  render() {

    const { navigation } = this.props;

  return(
    
    <ImageBackground source={require('../assets/splashscreen.png')}
    style={styles.image}>

<ScrollView >
    <View style={styles.container}>
      <Image source={require('../assets/agetext.png')}
      style={styles.textage}/>
      
      <TextInpu
      placeholder="First name"
      placeholderTextColor='#6CCBB0'
      onChangeText={firstname => this.setState({firstname})}
      
      />
      <TextInpu
      placeholder="Last name"
      placeholderTextColor='#6CCBB0'
      onChangeText={lastname => this.setState({lastname})}
      />
       <TextInpu
      placeholder="Username"
      placeholderTextColor='#6CCBB0'
      onChangeText={username => this.setState({username})}
      />
       <TextInpu
      placeholder="Password"
      placeholderTextColor='#6CCBB0'
      onChangeText={password => this.setState({password})}
      />
       <TextInpu
      placeholder="Email"
      placeholderTextColor='#6CCBB0'
      onChangeText={email => this.setState({email})}
      />
       <TextInpu
      placeholder="Phone"
      placeholderTextColor='#6CCBB0'
      onChangeText={phone => this.setState({phone})}
      />
    
    
    <DatePicker
        style={styles.date}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2090-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: -8,
            top: 6,
            marginLeft: 12
          },
          dateInput: {
            marginLeft: 10,
            borderBottomWidth:1,
            borderColor:'white',
            
          
            borderWidth:0
            
           
          
            
          },  dateText: {
            fontSize:16,
            color: "#6CCBB0",
            textAlign: "left",
            marginRight:212
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => this.setState({date})}
      />




   <View style={{flexDirection:'column',marginTop:10}}>
   <Text style={{ marginVertical:22,fontSize:18,color:'#6CCBB0',marginLeft:10}}>Gender</Text>
 
   <View style={styles.cont}>
        <RadioForm
         
        
          onPress={(value) => {this.genderchange(value)}}
         
        
          labelHorizontal={true}
          formHorizontal={true}
         
          selectedButtonColor={'white'}
          selectedLabelColor={'blue'}
      
          buttonSize={10}
         
          

          disabled={false}
         hobbies
          initial={0}
          formHorizontal={true}
          style={styles.radioButton}
          buttonColor={'#6CCBB0'}
          buttonOuterColor={'#6CCBB0'}
          labelStyle={{ color: '#6CCBB0'}}
          
        
          radio_props={hobbies}
          animation={true}
         
         
         
        />
      </View>
 <View style={styles.contain}>
      <Picker
       
        style={styles.pick}
        onValueChange={country => this.setState({country})}
      >
        <Picker.Item label="Country" value="java" color='#6CCBB0' />
        <Picker.Item label="Pakistan" value="Pakistan" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="England" value="England" />
      </Picker>
    </View>

  <View style={{flexDirection:'row'}}>
    <View style={styles.containe}>
    <Picker
    
        style={styles.pickk}
        onValueChange={state => this.setState({state})}
      >
        <Picker.Item label="State" value="State" color='#6CCBB0' />
        <Picker.Item label="Pakistan" value="Pakistan" />

      </Picker>
    </View>


    <View style={styles.containe}>
      <Picker
       
        style={styles.pickk}
        onValueChange={city => this.setState({City})}
      >
        <Picker.Item label="City" value="City" color='#6CCBB0' />
        <Picker.Item label="Gujranwala" value="Gujranwala" />
        <Picker.Item label="Gujrat" value="Gujrat" />
        <Picker.Item label="Lahore" value="Lahore" />
        <Picker.Item label="Sialkot" value="Sialkot" />
      </Picker>
    </View>
    </View>
      

</View>



     
   
      <LoginButton     onPress={()=>{this.login()}} >Sign Up</LoginButton>


         
     
    

    </View>
    </ScrollView>
    </ImageBackground>
  
  );
}
}

const styles=StyleSheet.create({


  image:{
    resizeMode: "center",
    height: '100%',
    width: '100%',
    
  },
  textage:{
    height: '7%',
    width: '74%',
    marginTop:16,
    marginBottom:20,
    marginLeft:38,
    alignItems:'center',
    resizeMode: "center",

  },
  container:{
    flex:1,
justifyContent:'center',
padding:10,
marginHorizontal:10,
marginVertical:40
   
  },
  cont: {
  
   width:'100%'
  
  },
  radioButton:{
    
    justifyContent:'space-around',
 
   
   
    
  },
  TextContainer:{
    
    color: 'white',
   
    fontSize: 18,
  },
  TextView:{
    margin:20
  },
  contain: {

    marginTop:19,
  
   
    
    
     borderBottomColor:'white',
   
     borderBottomWidth:1,
     width:290,
     marginLeft:12,
     color:'red'
   },
   pick:{
      height: 50,
       width: 316, 
       marginLeft:-8,
       color:'#6CCBB0',
 
   },
   containe: {

    marginTop:19,
  
   
    
    
     borderBottomColor:'white',
   
     borderBottomWidth:1,
     width:'43%',
     marginLeft:12,
     color:'red'
   },
   pickk:{
      height: 50,
      width: 165, 
      marginLeft:-8,
     
      color:'#6CCBB0',
 
   },
  input: {
    height: 40,
    width:'37%',
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor:'white',
      
  },
  date: {
      
    height: 30,
    marginTop:8,
    width: 307, 

   

  },
  yes:{

    marginLeft:32


  }
})

