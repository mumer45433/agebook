import React, { Component } from 'react';

import { View, ImageBackground,StyleSheet,Image, TextInput,Text, ScrollView,Button, TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NotificationView from '../components/NotificationView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';


import { Container, Header, Content, Item, Input, Left, Right } from 'native-base';




import MyCard from '../components/MyCard';



export default class chatroom extends Component {


  constructor() {
 
    super();
 
    this.state = {

   
  
      data1:[],
      id: '',
      message: '',
      // chatid: this.props.chatid,
      existingchat: [],
      spinner: false,
      check: false,
      name: '',
      text: "Send",
      checkid:true,
      status:false,
      display_name:'',
      imageSource1:null,
      test:[],
      chatid:'',
      chat_iiid:0

  
     
    }
  }






  componentDidMount=async()=>{

    let user = await AsyncStorage.getItem('customer');  
    // console.log(user)
    let parsed = JSON.parse(user); 
    let id = parsed[0].id;
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidddddddddddddddddddddddd=>',id)
    let user_iid= this.props.route.params.receiver_id;
    let chat_iiid= this.props.route.params.chat_iiid;
    let sender_id= this.props.route.params.sender_id;


    console.log('t==========user_iiduser_iiduser_iid================chat_iiid',user_iid)
  
    this.setState({
      id:id,
      user_iid:user_iid,
      sender_id:sender_id
  
  
    })
    console.log('t==========================g',id)
    console.log('00000000000',chat_iiid)
    // console.log('t==========ijiiiiiiijjjjjjjiiiiiiiiiiiiiiiiiiiiiiiiiii00000000================g',chat_iiid)
    // console.log('t==========ijiiiiiiijjjjjjjiii0================g',receiver_id)


  
  
  
    //  this.send_first_message();
  
     if(this.props.route.params.chat_iiid)
     {
         this.setState({
             chat_iiid:this.props.route.params.chat_iiid
         })
         this.getexistingchat1();
     }
     else
     {
         this.getchatid();
     }
  
  
  this.timer = setInterval(()=> this.getexistingchat(), 3000)
   
//    this.getexistingchat();
//   this.getchatid();
   }



  getchatid() {
    this.setState({
        spinner1:true
    })
    let api = 'http://192.168.10.10/Api/testing.php?action=get_existing_chat';


    // console.log("get chat id ##############################",this.state.id)
    // console.log("get chat id ##############################",this.props.vendorid)

    fetch(api, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: `sender_id=${this.state.id}&receiver_id=${this.state.user_iid}`,
    })
        .then((response) => response.json())
        .then((json) => {
            let resjson = json.response
            console.log("chat is => ",resjson)
           // console.log("chat =>"+json.response);
            this.setState({
                spinner1:false
            })
            if (json.response == "fail") {
                this.setState({
                    checkid:false
                })
                
            }
            else {
                console.log("chat id ",Object.keys(resjson))
                let id = resjson[0].id
                console.log("chat id ",id)
               
                this.setState({

                    chat_iiid: id,
                    checkid:true
                    

                })
             

                
            }

           // this.getexistingchat1()



        })
        .catch((error) => {
            console.error(error);
        })


}


getexistingchat() {



//    console.log("check email "+this.state.chat_iiid)
  let api = 'http://192.168.10.10/Api/testing.php?action=get_chat_messages_by_id';

  fetch(api, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: `chat_iiid=${this.state.chat_iiid}`,
  })
      .then((response) => response.json())
      .then((json) => {
         //console.log("get message")
        // console.log(json.response);
         let response = json.response

          if(json.response=="fail")
          {
              this.setState({
                  checkid:false
              })
          }
          else
          {
          this.setState({
              test: response,

              existingchat: response,
              checkid:true,
              // text: "Send",
          })
        
      }



      })
      .catch((error) => {
          console.error(error);
      })


}



getexistingchat1() {

  this.setState({
      spinner1:true
  })
  
         console.log("check chat_iiid ",this.state.chat_iiid)
         let api = 'http://192.168.10.10/Api/testing.php?action=get_chat_messages_by_id';
        //  console.log("check email ",api)

         fetch(api, {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
             },
             body: `chat_iiid=${this.state.chat_iiid}`,
         })
             .then((response) => response.json())
             .then((json) => {
                // console.log("get message")
                // console.log(json);
                 let response = json.response
                // console.log("chat record",response);
                 if(json.response=="fail")
                 {
                     this.setState({
                         checkid:false
                     })
                 }
                 else
                 {
                 this.setState({
                  test: response,
                     existingchat: response,
                     checkid:true,
                     text: "Send",
                 })
             }
  
  this.setState({
      spinner1:false
  })
  
             })
             .catch((error) => {
                 console.error(error);
             })
  
  
  
  
  
  
  
  
     }
































       send_first_message=()=> {
    
   
       
            if(this.state.message=="")
            {
                alert("Do not send empty message");
                
            }
            else
            {
                   
  
        if (this.state.checkid == true) {
            this.setState({
                text: "Sending.."
            })
            let uploaddata = new FormData();
         let message = this.state.message

         let chatid1 = this.state.chat_iiid
         console.log("check => ",chatid1)
         console.log("check => ",chatid1)
      

         uploaddata.append('chat_id',chatid1);
         uploaddata.append('sender_id',this.state.id);
         uploaddata.append('receiver_id',this.state.sender_id);
         uploaddata.append('message',message);
         console.log("check111111111111111111 => ",this.state.id)
         console.log("check00000000000 => ",this.state.user_iid)
          
                let api = 'http://192.168.10.10/Api/testing.php?action=send_new_message';


            fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "otherHeader": "foo",
                },
                body: uploaddata,
            })
                .then((response) => response.json())
                .then((json) => {
                   console.log("00000000000000000000000000000000",json.response);

                    if (json.response == "fail") {

                        alert("network Fail")

                    }
                    else {
                        this.setState({
                            message: '',
                            text: "Send",
                            
                        })
               

                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        else{
            
            this.setState({
                text: "Sending.."
            })


            let uploaddata = new FormData();
            let message = this.state.message

            uploaddata.append('sender_id',this.state.id);
            uploaddata.append('receiver_id',this.state.user_iid);
         uploaddata.append('message',message);
                   
            //console.log("vendor_id ", vendorid, " message ", message, "user-id ", senderid,"message_image ",newImage,"date ",currentdate)
                let api = 'http://192.168.10.10/Api/testing.php?action=send_first_new_message';
            // console.log("vendor => ",this.props.vendorid)
            // console.log("message => ",this.state.message)
            // console.log("user id => ",this.state.id)
            // console.log("product id => ",this.props.productid)
            console.log("api => ",api)  
            fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "otherHeader": "foo",
                },
                body: uploaddata,
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("chatid is =>")
                    console.log(json.response);
                  

                    if (json.response == "fail") {

                        alert("network Fail")

                    }
                    else {
                        this.setState({
                            message: '',
                            text: "Send",
                            checkid:true,
                            
                            chatid:json.response
                        })
                        //let token = this.props.token
                        //console.log(token)
                        //this.SendNotification();
                        //this.getexistingchat();

                    }
                })
                .catch((error) => {
                    console.error(error);
                })

        
        }
   
      
    }
}





// send_first_message=()=> {
    
   
       
//     if(this.state.message=="")
//     {
//         alert("Do not send empty message");
        
//     }
//     else
//     {
           

// if (this.state.checkid == true) {
//     this.setState({
//         text: "Sending.."
//     })
//     let uploaddata = new FormData();
//  let message = this.state.message

//  let chatid1 = this.state.chat_iiid
//  console.log("check => ",chatid1)


//  uploaddata.append('chat_id',chatid1);
//  uploaddata.append('sender_id',this.state.id);
//  uploaddata.append('receiver_id',this.state.user_iid);
//  uploaddata.append('message',message);
  
//         let api = 'http://192.168.10.5/Api/testing.php?action=send_first_new_message';


//     fetch(api, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "multipart/form-data",
//             "otherHeader": "foo",
//         },
//         body: uploaddata,
//     })
//         .then((response) => response.json())
//         .then((json) => {
//            console.log(json.response);

//             if (json.response == "fail") {

//                 alert("network Fail")

//             }
//             else {
//                 this.setState({
//                     message: '',
//                     text: "Send",
                    
//                 })
       

//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         })
// }


    




// if (this.state.checkid == true) {
//     this.setState({
//         text: "Sending.."
//     })

//     let uploaddata = new FormData();
//  let message = this.state.message

//  let chatid = this.state.chat_iiid


//           uploaddata.append('chat_id',chatid);
//  uploaddata.append('sender_id',this.state.id);
//  uploaddata.append('receiver_id',this.state.user_iid);
//  uploaddata.append('message',message);
  

//         let api = 'http://192.168.10.5/Api/testing.php?action=send_first_new_message';


//     fetch(api, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "multipart/form-data",
//             "otherHeader": "foo",
//         },
//         body: uploaddata,
//     })
//         .then((response) => response.json())
//         .then((json) => {


//             if (json.response == "fail") {

//                 alert("network Fail")

//             }
//             else {
//                 this.setState({
//                     message: '',
//                     text: "Send",
                    
//                 })

//             }
//         })
//         .catch((error) => {
//             console.error(error);
//         })
// }

// }
// }













  

       Display_message=()=>{

  
    
        let uploaddata = new FormData();         
            
        uploaddata.append('receiver_id',this.state.user_iid);

    
    
        let api = 'http://192.168.10.10/Api/testing.php?action=Display_message';
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
              console.log("response",response.response)
              this.setState({
                data1:response.response
              })
               
            })
            .catch((error) => {
                console.error(error);
            
            });
    
    
      
 
        
      
      }
 
       
   

  render() {

    const { navigation } = this.props;

    
  



    return (
 
 
       <View style={styles.container}>
   <View style={styles.HeaderView}>

<View style={styles.Line}>

     
    
    <MaterialIcons name="arrow-back" size={35} color='white' style={{marginHorizontal:5,marginTop:10,marginLeft:-16}} />


    <View style={styles.LineView}>
    <Image source={require('../assets/qw.png')}
    style={styles.ImageAvater}/>
   
<View style={{flexDirection:'column'}}>
    <Text style={{fontSize:20,color:'white',fontWeight:'bold',marginHorizontal:8}}>Daved Marks</Text>
    <Text style={{fontSize:11,color:'greenyellow',fontWeight:'bold',marginHorizontal:8}}>Active Now</Text>
    </View>
  
   
</View>
<Entypo name="dots-three-vertical" size={25} color='white' style={{marginHorizontal:-16,marginTop:7,marginLeft:80}} />
</View>
</View>



<FlatList
      data={this.state.existingchat}
      keyExtractor={item => item.id}
      renderItem={itemData => (
<View >
   

<View style={styles.mess}>


<Text style={{color:'black',marginHorizontal:8,fontSize:16,marginTop:12}}>{itemData.item.message}</Text>
<Text style={{color:'black',fontSize:9, alignSelf:'flex-end',marginRight:4,marginBottom:-6,}}>9:50 AM</Text>
</View>
                     </View>

      
)}
/>  

{/* <View style={styles.mess}>


  <Text style={{color:'black',marginHorizontal:8,fontSize:16}}>jjhn Looks greatjjh kjhhhhhjkjjl jjjjj</Text>
<Text style={{color:'black',fontSize:9, alignSelf:'flex-end',marginRight:4,marginBottom:-6,}}>9:50 AM</Text>
</View> */}

{/* <View style={styles.messL} >

<Text style={{color:'black',marginHorizontal:8,fontSize:16}}> jkkkkkkkkj!!</Text>
<Text style={{color:'white',fontSize:9, alignSelf:'flex-end',marginRight:4,marginBottom:-6,}}>9:50 AM</Text>
</View> */}


{/* 
<View style={styles.mess}>


<Text style={{color:'black',marginHorizontal:8,fontSize:16}}>Check </Text>
<Text style={{color:'black',fontSize:9, alignSelf:'flex-end',marginRight:4,marginBottom:-6,}}>9:50 AM</Text>
</View> */}











<View  style={{flexDirection:'row',alignItems:'center', position:'absolute',bottom:5}}>
<View style={styles.searchSection}>
    <Entypo style={styles.searchIcon} name="emoji-happy" size={20} color="#25919d"/>
    <TextInput
        style={styles.inpu}
        placeholder="Type Message"
        placeholderTextColor="#25919d"
        onChangeText={(searchString) => {this.setState({searchString})}}
        underlineColorAndroid="transparent"
        onChangeText={message => this.setState({message})}
    />
</View>
        
{/* <Image source={require('../assets/vi.png')}  onPress={() => { this.send_first_message() }}
      style={styles.textge}
      /> */}
         <TouchableOpacity onPress={()=>{this.send_first_message()}}>
         <MaterialCommunityIcons  style={styles.textge} name="send" size={35} color="#389bf1"/>
         </TouchableOpacity>
</View>
</View>

  
  
  )
}

}






const styles=StyleSheet.create({
  container:{
    flex:1,


   
  },
  HeaderView:{
    backgroundColor:'#25919d',
    height:100,
  
   
  },

  ImageAvater:{
    width:60,
    height:60,
    borderRadius:30,
  
   
  
   
   
  },
  searchSection: {
   flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width:300,
height:44,
    marginHorizontal:10,
    marginTop:229,
    borderColor:'#25919d',

    borderWidth:2,
    borderRadius:2,
  
 
  
    
},
searchIcon: {
    padding: 10,
    
},
inpu: {
    flex: 1,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    paddingLeft: 60,
    backgroundColor: '#fff',
    color: '#25919d',
},

 Avater:{
  width:220,
  height:110,
 
  marginLeft:-9,
 
  borderRadius:8,
  borderWidth:1,
  marginTop:-12

 

 },
 mess:{
  maxWidth: '75%',
  maxHeight: '94%',
  backgroundColor:'lightgray',
  borderRadius:8,
  padding:8,
  marginTop:12,
  marginHorizontal:8,



  
 },
 messL:{
  maxWidth: '75%',
  maxHeight: '94%',
  backgroundColor:'#25919d',
  borderRadius:8,

  padding:8,
  alignSelf:'flex-end',
  marginTop:12,
  marginHorizontal:8
 },

 messlL:{
  maxWidth: '95%',
  maxHeight: '94%',
  backgroundColor:'#25919d',
  borderRadius:8,

  padding:8,
  alignSelf:'flex-end',
  

 },

 textge:{
  height: 46,
  width: 46,
  marginTop:229,
  marginRight:6,
  borderRadius:3
},

  Line:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'

    

  },
  LineView:{
    
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    
   

  },
 
})

