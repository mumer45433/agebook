import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image, TextInput,Button, ScrollView ,Picker,AsyncStorage} from 'react-native';

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
import DateTimePicker from '@react-native-community/datetimepicker';

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
      gender:'Male',
      country:'',

      city:'',
      state:'',
      
  
 
    }
 
  }



  Update_Data=()=>{
         

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
    
    uploaddata.append('id',this.state.id);
    console.log("hdbbh =>",this.state.id)

    //uploaddata.append('fcm_token',this.state.token);

  
    let api = 'http://192.168.10.6/Api/testing.php?action=update_user';
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
        // this.props.navigation.navigate('Dho');
      
      
}

componentDidMount=async()=>{
  let user = await AsyncStorage.getItem('customer');  
   console.log(user)
  let parsed = JSON.parse(user); 
  let id = parsed[0].id;
  let firstname = parsed[0].firstname;
  let email = parsed[0].email;
  let password = parsed[0].password;
  let username = parsed[0].username;
  let phone = parsed[0].phone;
  let lastname = parsed[0].lastname;
  let date = parsed[0].date;
  let gender = parsed[0].gender;
  let country = parsed[0].country;
  let city = parsed[0].city;
  let state = parsed[0].state;
  console.log('gender=>',gender)
  let start;
  if(gender=="Male")
  {
    this.setState({
      gendervalue11:0
    })
  }
  else if(gender=="Female")
  {
    this.setState({
      gendervalue11:1
    })
  }
  else if(gender=="Other")
  {
    console.log("othereeeeeeeeeeeeeeeeeeeeeeeeeeee")
    this.setState({
      gendervalue11:2
      
    })
   
  }
  
  console.log("othereeeeeeeeeeeeeeeeeeeeeeeeeeee",this.state.gendervalue11)

  this.setState({
    id:id,
    firstname:firstname,
    email:email,
    password:password,
    username:username,
    phone:phone,
    lastname:lastname,
    date:date,
    gender:gender,
    country:country,
    city:city,
    state:state
  })
  console.log('bjdbjkbvhsgddb',id)
  console.log('firstname',firstname)
  console.log('firstname',email)
  console.log('firstname',password)
  console.log('gendervalue=>',gender)
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

}

  render() {
 
    const { navigation } = this.props;
 
    

  return(
    
    <ImageBackground 
    style={styles.image}>

<ScrollView >

    <View style={styles.container}>
    <View style={{marginHorizontal:77,marginBottom:23}}>
    <Text style={{fontSize:33,color:'#459386',fontWeight:'bold'}}>Edit Profile</Text>
     </View>
      <View style={{flexDirection:'row'}}>
      <TextInput
      placeholder="First name"
      placeholderTextColor='#6CCBB0'
      value={this.state.firstname}
      onChangeText={text => this.setState({firstname:text})}
      style={[styles.text,{marginHorizontal:8}]}
      color={'gray'}
      
      />
      <TextInput
      placeholder="Last name"
      placeholderTextColor='#6CCBB0'
      style={styles.text}
      value={this.state.lastname}
      onChangeText={text => this.setState({lastname:text})}
      color={'gray'}
      />
      </View>


       <TextInput
      placeholder="Username"
      placeholderTextColor='#6CCBB0'
      style={styles.textinput}
      value={this.state.username}
      onChangeText={text => this.setState({username:text})}
      color={'gray'}
      />





       <TextInput
      placeholder="Password"
      placeholderTextColor='gray'
      value={this.state.password}
      style={styles.textinput}
      onChangeText={text => this.setState({password:text})}
      color={'gray'}
      />
       <TextInput
      placeholder="Email"
      placeholderTextColor='#6CCBB0'
      value={this.state.email}
      style={styles.textinput}
      onChangeText={text => this.setState({email:text})}
      color={'gray'}
      />
       <TextInput
      placeholder="Phone"
      placeholderTextColor='#6CCBB0'
      style={styles.textinput}
      value={this.state.phone}
      onChangeText={text => this.setState({phone:text})}
      color={'gray'}
      
      />
    
    
    <DatePicker
        style={styles.date}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 3,
            top: 6,
            marginLeft: 12
          },
          dateInput: {
            borderBottomWidth:1,
            borderColor:'white',
            
          
            borderWidth:0,
          marginTop:9
            
           
          
            
          },  dateText: {
            fontSize:16,
        color: "gray",
        textAlign: "left",
        marginRight:204
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={text => this.setState({date:text})}
      />




   <View style={{flexDirection:'column'}}>
   <Text style={{ marginVertical:22,fontSize:18,color:'#6CCBB0',marginLeft:10}}>Gender</Text>
 
   <View style={styles.cont}>
        <RadioForm
         
        
         onPress={(value) => {this.genderchange(value)}}
         
        
          labelHorizontal={true}
          formHorizontal={true}
         
          selectedButtonColor={'#6CCBB0'}
          selectedLabelColor={'blue'}
      
          buttonSize={10}
         
          

          disabled={false}
          initial={this.state.gendervalue11}
         
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
        selectedValue={this.state.country}
       
        onValueChange={text => this.setState({country:text})}
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
        selectedValue={this.state.city}
       
        onValueChange={text => this.setState({city:text})}
      >
        <Picker.Item label="State" value="State" color='gray' />
        <Picker.Item label="Pakistan" value="Pakistan" />

      </Picker>
    </View>


    <View style={styles.containe}>
      <Picker
       
        style={styles.pickk}
        selectedValue={this.state.state}
       
        onValueChange={text => this.setState({state:text})}
      >
        <Picker.Item label="City" value="city" color='#6CCBB0' />
        <Picker.Item label="Gujranwala" value="Gujranwala" />
        <Picker.Item label="Gujrat" value="Gujrat" />
        <Picker.Item label="Lahore" value="Lahore" />
        <Picker.Item label="Sialkot" value="Sialkot" />
      </Picker>
    </View>
    </View>
      

</View>



     
   
      <LoginButton     onPress={()=>{this.Update_Data()}} >Save</LoginButton>


         
     
    

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
  text:{
width:'46%',
height:50,
borderWidth:2,
backgroundColor:'white',
borderColor:'#6CCBB0',
borderRadius:8,
paddingHorizontal:12

  },
  textinput:{
    width:'94%',
    height:50,
    borderWidth:2,
    backgroundColor:'white',
    borderColor:'#6CCBB0',
    marginTop:16,
    marginHorizontal:8,
    borderRadius:8,
    paddingHorizontal:12
   
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
  
   backgroundColor:'white',
    paddingHorizontal:4,
    
     borderColor:'#6CCBB0',
     borderRadius:8,
   
     borderWidth:2,
height:50,
     width:290,
     marginHorizontal:10,
 
     color:'red'
   },
   pick:{
      
       width: 290, 
      
       color:'gray',
 
   },
   containe: {

    marginTop:19,
    backgroundColor:'white',
    paddingHorizontal:4,
    borderRadius:8,
    height:50,
     borderWidth:2,
     borderColor:'#6CCBB0',
    

   
   
     width:'43%',
     marginLeft:12,
     color:'red'
   },
   pickk:{
    
      width: 138, 
      color:'gray',
     
     
 
   },
  input: {
    height: 40,
    width:'37%',
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor:'white',
      
  },
  date: {
    height: 50,
    marginTop:16,
    width: 300, 
    borderWidth:2,
    borderColor:'#6CCBB0',
    backgroundColor:'white',
    borderRadius:8,
    marginHorizontal:8


   

  },
  yes:{

    marginLeft:32


  }
})

