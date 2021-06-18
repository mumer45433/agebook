import React, { Component } from 'react';
import { View, ImageBackground,StyleSheet,Image, AsyncStorage,TextInput,Text,KeyboardAvoidingView, ScrollView,Button, TouchableOpacity,Platform,FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NotificationView from '../components/NotificationView';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Content, Card, CardItem, Thumbnail, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePlaceholder from 'react-native-img-placeholder';
import RBSheet from "react-native-raw-bottom-sheet";
import { GiftedChat } from 'react-native-gifted-chat'

export default class HomeScreen extends Component {



  constructor() {
 
    super();
 
    this.state = {

      data:[],
      data1:[],
      image:null,
      comment:'',
      heart:'',
      heart1:'',
      hearttest:false,
     
    }
  }





  Get_Data=()=>{


    let uploaddata = new FormData();         
        
           uploaddata.append('id',this.state.id);
           console.log("00000000000000000000000000000000000 =>",this.state.id)


    let api = 'http://192.168.10.10/Api/testing.php?action=Display_image';
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

          for (let i = 0; i < response.response.length; i++) {
            //    console.log(response.response[i].P_id)
                let heart = "heart" + response.response[i].id
                let heart1 = "heart1" + response.response[i].id
                let hearttest = "hearttest" + response.response[i].id
             console.log("heartheartheartheartheart",heart)
                this.setState({
                  [heart]: 'thumbs-up',
                  [heart1]: 'heart1',
                  [hearttest]: false,
          
                })
              }

          this.setState({
            data:response.response,
           
          })
               
        })
        .catch((error) => {
            console.error(error);
        
        });
      
     
}



Get_like=(value,value1)=>{

let postid=value
let user_iid=value1



  let uploaddata = new FormData();  
  
  let heart = 'heart' + value
  let hearttest = 'hearttest' + value
  this.setState({
    [heart]: 'thumbs-down',
    [hearttest]: true
  })
     
        uploaddata.append('id',this.state.id);
        uploaddata.append('postid',postid);
        console.log("iddddd =>",this.state.id)
        console.log("iddddduuuuuuuuuuuuuuuuuu =>",postid)
        console.log("iddddduuuuuuuuuuuuuuuuuu000000000000000000000000000000000000000000000000000000000000000000000000000 =>",user_iid)

 let api = 'http://192.168.10.10/Api/testing.php?action=Get_like';
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
    this.Get_Notfication(postid,user_iid);
            
     })
     .catch((error) => {
         console.error(error);
     
     });
   }



   Delete_like=(value)=>{
         
    let postid=value

  let uploaddata = new FormData();   
  
  let heart = 'thumbs-down' + value
  let hearttest = 'hearttest' + value
  this.setState({
    [heart]: 'thumbs-up',
    [hearttest]: true
  })
     
        uploaddata.append('id',this.state.id);
        uploaddata.append('postid',postid);
        console.log("iddddd =>",this.state.id)
        console.log("iddddduuuuuuuuuuuuuuuuuu =>",postid)

    let api = 'http://192.168.10.10/Api/testing.php?action=delete_like';
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
      
}


changestatus(value) {

  let postid=value
  let uploaddata = new FormData();
  let heart = 'heart' + value
  let hearttest = 'hearttest' + value
  let api = 'http://192.168.10.10/Api/testing.php?action=Get_like';
  if (this.state[heart] == 'thumbs-up') {
    this.setState({
      [heart]: 'thumbs-down'
    })
  }
  else {
    
    api = 'http://192.168.10.10/Api/testing.php?action=delete_like';
    this.setState({
      [heart]: 'thumbs-up'
    })
  }

        uploaddata.append('id',this.state.id);
        uploaddata.append('postid',postid);
  //console.log("email => ", this.state.username)
  //console.log("pass => ", this.state.password)
 // console.log("pass => ", api)
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
     // console.log("response", response.response)
      if (response.response == "fail") {
      }
      else {
        //this.onupdatesuccess();
      }
    })
    .catch((error) => {
      console.error(error);
    })
}


User_comments=()=>{

 
  let comment = this.state.comment

  
    let uploaddata = new FormData();    

      

          uploaddata.append('id',this.state.id);
          uploaddata.append('postid',this.state.commentid);
          uploaddata.append('comment',comment);
          console.log("idididididididid =>",this.state.id)
          console.log("postidpostidpostidpostidpostidpostid =>",this.state.commentid)
          console.log("commentcommentcommentcommentcomment =>",comment)
  
   let api = 'http://192.168.10.10/Api/testing.php?action=User_comments';
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
          data1:response.response,
        })
       })
       .catch((error) => {
           console.error(error);
       
       });
     }






  postfun=(value)=>{

    let commentid=value
    console.log('t==========================g',commentid)
    this.setState({
      commentid:commentid,
  
  
    })
    // console.log('t==============g',commentid)

    let uploaddata = new FormData();         
        
    uploaddata.append('postid',commentid);
    console.log("iddlllllllllllllddd =>",commentid)


    let api = 'http://192.168.10.10/Api/testing.php?action=Display_comment';
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


  
    this.RBSheet.open()
    
  
  }



  Get_Notfication=(value,value2)=>{

let postid=value
let postuser_iid=value2
    
    let uploaddata = new FormData();  

       
          uploaddata.append('post_id',postid);
          console.log(".com.com.com.com=>",postid)
          uploaddata.append('postuser_iid',postuser_iid);
          console.log(".com.postuser_idpostuser_idpostuser_id.com.com=>",postuser_iid)
          uploaddata.append('user_id',this.state.id);
         
          console.log(".com.com.com.com.com.com.com.com.com.com =>",this.state.id)
  
   let api = 'http://192.168.10.10/Api/testing.php?action=Notification';
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
      
              
       })
       .catch((error) => {
           console.error(error);
       
       });
     }
  

  
  

  
componentDidMount=async()=>{

  let user = await AsyncStorage.getItem('customer');  
  // console.log(user)
  let parsed = JSON.parse(user); 
  let id = parsed[0].id;
  console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidddddddddddddddddddddddd=>',id)

  this.setState({
    id:id,


  })
  console.log('t==========================g',id)


  this.Get_Data();
 

 }





 
  
  

  createtable1 = () => {
    let table = []
    // console.log(hasRecord)
    // let len = this.state.campaignlist.length;
    // let hasRecord = this.state.campaignlist;
  let record = this.state.data
   let len = record.length
  //console.log(hasRecord[0])
    if (record != 'fail') {
        for (let i = 0; i < len; i++) {
          let post_id = record[i].id
          let user_iid = record[i].user_idd
          let post_title = record[i].title
          let post_date = record[i].date
          let post_ImageURL = record[i].image
          let user_ImageURL = record[i].user_image
          let firstname = record[i].firstname
        
          let total_comments = record[i].total_comments
           let total_likes = record[i].total_likes
           let my_likes = record[i].my_like
           let hearttest = 'hearttest' + post_id
           let heart = 'heart' + post_id
          
          let path = 'http://192.168.10.10/Api/uploads/'+post_ImageURL
          let myprofile = record[i].user_image
          let profilepath = 'http://192.168.1.14/Api/uploads/'+myprofile

  

         

       
          console.log('user_iidooooooookaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk=>>>>>>>>>>>>',user_iid)
          console.log('heart=>>>>>>>>>>>>',heart)
          // console.log('total_likestotal_likestotal_likes=>>>>>>>>>>>>',total_likes)
  table.push(<View>
  {
    <View>
        <Content  >
        
       
        <Card>
            <ImageBackground source={require('../assets/chat.png')} resizeMode='stretch' style={styles.container1}>
              <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Thumbnail source={require('../assets/wq.jpg')} style={{ width: 30, height: 30 }} /> */}
                  <TouchableOpacity   onPress={() => this.props.navigation.navigate('AddfriendScreen', 
                  { 
                    user_iid:user_iid, 
                    firstname:firstname,
                    user_ImageURL:user_ImageURL,
                    total_comments:total_comments,
                    total_likes:total_likes
                    }
                  
                  
                  )} >
                  <ImagePlaceholder
  //  style={{ height: 200, width: null, flex: 1 }}
   style={{ width: 30, height: 30,borderRadius:15  }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:profilepath  }}
    borderRadius={50}
/>
</TouchableOpacity>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 12 }}>{firstname}</Text>
                    <Text style={{ fontSize: 12 }} note>{post_date}</Text>
                  </View>
                </View>
                <Icon name="dots-three-horizontal" type="Entypo" style={[styles.cardicon, { alignSelf: 'center' }]} />
              </View>
              <View style={{marginHorizontal:12,marginVertical:4}}>
              <Text style={{ fontSize: 16 }}>{post_title}</Text>
              </View>
              <CardItem cardBody>
                
              <ImagePlaceholder
   style={{ height: 200, width: null, flex: 1, }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:path  }}
    resizeMode={'cover'}
/>
              </CardItem>
                <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 15, justifyContent: 'space-between' }}>
                  <TouchableOpacity  style={{flexDirection:'row'}}>
            
  {this.state[hearttest] == false ?
<View>{my_likes != null ? <Icon name="thumbs-down" type="Entypo"  style={styles.cardicon} onPress={()=>{this.Delete_like(post_id)}} /> 
 :<Icon name="thumbs-up" type="Entypo" style={styles.cardicon1}  onPress={()=>{this.Get_like(post_id,user_iid)}} />}</View> :
<View><Icon name={this.state[heart]} type="Entypo" size={42}  style={(this.state[heart]=="thumbs-down"? {color:"#319581",fontSize:20,  marginTop:5 }
:{color:"gray",fontSize:20,  marginTop:1})}  onPress={() => { this.changestatus(post_id) }} /></View>}




            {/* {my_likes != null ? <Icon name="thumbs-up" style={styles.cardicon} onPress={()=>{this.Delete_like(post_id)}} /> 
            :  <Icon name="thumbs-up" style={styles.cardicon1}  onPress={()=>{this.Get_like(post_id)}} />} */}
   
                
                   
              
                    <Text style={styles.cardtext}> {total_likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity  onPress={() => this.postfun(post_id)} style={{flexDirection:'row' }}>
                  <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
       
          height={600}
          openDuration={250}
          customStyles={{
         
          }}
        >
      
   
   
  
     <View  style={{height:'100%'}}>

     <View style={{height:40,borderBottomWidth:1,borderColor:'gray',width:'100%'}}></View>
     <FlatList
      data={this.state.data1}
      keyExtractor={item => item.id}
      renderItem={itemData => (
<View >
   
{/* let post_ImageURL = item.item.user_image
let path1 = 'http://192.168.10.6/Api/uploads/'+post_ImageURL */}
     <View style={{ flexDirection: 'row', alignItems:'baseline',padding:12 }}>
                       {/* <Thumbnail source={require('../assets/wq.jpg')} style={{ width: 30, height: 30 }} /> */}
                
                       <ImagePlaceholder
       //  style={{ height: 200, width: null, flex: 1 }}
        style={{ width: 30, height: 30,borderRadius:15,  }}
         loadingStyle={{ size: 'large', color: 'blue' }}
         source={{ uri:'http://192.168.10.10/Api/uploads/'+itemData.item.user_image  }}
         borderRadius={50}
     />
     
     <View style={{flexDirection:'column',marginHorizontal:6}}>
                       <View style={styles.mess}>
     
                       <Text style={{ fontSize: 16,fontWeight:'bold' }}>{itemData.item.firstname}</Text>
     <Text style={{ fontSize: 15,marginTop:1 }}>{itemData.item.comment}</Text>
                  </View>
                  <Text style={{ fontSize: 13,marginTop:4,marginHorizontal:8 }} note>{itemData.item.time}</Text>
                     </View>
                    
                     </View>
     
                     </View>

      
)}
/>  

    

     <View style={{ position:'absolute',bottom:10,}}>
     <View style={{borderTopWidth:1,borderColor:'gray'}}></View>
     
     <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
     <Feather style={styles.searchIcon} name="camera" size={30} color="gray"/>

         <TextInput
             style={styles.inpu}
             placeholder="Type comment"
             placeholderTextColor="gray"
             onChangeText={comment => this.setState({comment})}
             underlineColorAndroid="transparent"
         />
          
           <TouchableOpacity onPress={()=>{this.User_comments()}}>
         <MaterialCommunityIcons style={styles.searchIcon} name="send" size={35} color="#389bf1"/>
         </TouchableOpacity>
      
     </View>
     
     </View>
   
   
     </View>
      


          {/* <YourOwnComponent /> */}
        </RBSheet>


                    <Icon name="chatbubbles" style={[styles.cardicon, { marginTop:2 }]} />
                    <Text style={[styles.cardtext, {}]}> {total_comments} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={{ flexDirection:'row'}}>
                    <Icon name="share" type="FontAwesome" style={[styles.cardicon,{marginTop:5}]} />
                    </TouchableOpacity>
                    </View>
            </ImageBackground>
          </Card>

       
      </Content>
    </View>
                }
            </View>
            )
            }
        return table
            }
    else {
        let img = []
        img.push(<View style={{ flex: 1, justifyContent: 'center' }} >
            {
  <View>
               
            </View>
            }</View>)
        return img
    }
  }
  


 


  render() {

    const { navigation } = this.props;

    
  


    return (


 
    <ScrollView >
<View>
<View style={styles.container}>



  
  <View style={styles.HeaderView}>
  
    <View style={styles.Line}>
  <Image source={require('../assets/agetext.png')}
        style={styles.textage}/>
         <MaterialIcons name="search" size={32} color='white' style={{marginTop:14,marginLeft:28}} />
        <MaterialIcons name="message" size={28} color='white' style={{marginTop:14,marginLeft:8}} 
        onPress={() => navigation.navigate('chat', { name: 'Jane' })} 
        />
  </View>
  
        <View style={styles.LineView}>
        <Image source={require('../assets/qw.png')}
        style={styles.ImageAvater}/>
        <Text style={{fontSize:22,color:'white',marginRight:80,marginLeft:10,fontWeight:'bold'}}>Alen Jeff</Text>
      
        <MaterialIcons name="edit" size={30} color='white' style={{marginLeft:-14}}   onPress={() =>
          navigation.navigate('ProfileScreen', { name: 'Jane' })
        }/>
        <MaterialIcons name="image" size={30} color='white' style={{marginLeft:17}} />
        <MaterialIcons name="videocam" size={35} color='white' style={{marginLeft:17}} />
       
  </View>
  </View>
  
  
 
  
   
      </View >
    
<View style={{marginTop:10}}>
      {this.createtable1()}
      </View>
     
   
   </View>  

 
 
    </ScrollView>
  
  )
}

}






const styles=StyleSheet.create({
  container:{
    flex:1,


   
  },
  HeaderView:{
    backgroundColor:'#25919d',
    height:180,
   
  },
  textage:{
  
    height:44,
   width:'50%',

   marginTop:18,
  
   marginLeft:60,
   marginRight:38

  },
  ImageAvater:{
    width:100,
    height:100,
    borderRadius:50,
    marginHorizontal:80,
    borderWidth:5,
    borderColor:'white'
   
   
  },
  contaconine: {
    backgroundColor: '#25919d',
    flexDirection:'row',
    alignItems:'center',
    width:160,
    height:33,
    marginLeft:6,
    borderRadius:4,
    marginBottom:4
  
 },
 text: {
  color:'white',
  padding:5,
  paddingHorizontal:25,
  fontSize:15


 },
  yss:{
      marginVertical:20,
      marginBottom:1

  },
  Line:{
    alignItems:'center',
    flexDirection:'row'

    

  },
  LineView:{
    
    marginTop:20,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    
   

  },

container1: {
  width: '100%'
},
header: {
    width: '100%',
    height: 100,
    backgroundColor: '#319581',
},
header1:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
},
headerlogo:{
    width:'70%',
},
headerlogo1:{
    width:'70%',
   flexDirection:'row'
},
headericons:{
    width:'30%',
    flexDirection:'row',
    justifyContent:'flex-end',
},
logo:{
    width:150,
    height:35,
    alignSelf:'flex-end',
    marginTop:10,
},
header1icon:{
    color:'white',
    fontSize:25,
    marginLeft:15,
    marginTop:10
},
container:{
  flex:1,


 
},
HeaderView:{
  backgroundColor:'#25919d',
  height:100,
  flex:1,
 
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

 padding:12,
backgroundColor:'#e0e0e0',
width:'70%',
height:44,
borderRadius:12

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

  maxWidth: '94%',
  maxHeight: '94%',
backgroundColor:'#e0e0e0',
borderRadius:18,
padding:10,
flexDirection:'column'






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
usericon:{
    width:30,
    height:30,
    alignSelf:'flex-start',
    marginTop:15,
    borderRadius:25
},
username:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
    width:'90%',
    textAlign:'left',
    marginTop:'8%',
    marginLeft:'3%'
},
header1icon1:{
    color:'white',
    fontSize:25,
    marginLeft:20,
    marginTop:20
},
cardicon: {
  color: '#319581',
  fontSize: 20,
  marginTop:5
},
cardicon1: {
  color: 'gray',
  fontSize: 20,
  marginTop:1
},
cardicon2: {

  fontSize: 20,
    marginTop:5
},
cardtext: {
  color: '#319581',
  marginLeft: 0,
  marginTop: 3
},

HeaderView:{
  backgroundColor:'#25919d',
  height:122,
 
},
textage:{
resizeMode:'center',
  height:38,
 width:'44%',

 marginTop:18,

 
 marginLeft:90

},
ImageAvater:{
  width:36,
  height:36,
  borderRadius:18,
 
},
Line:{
  alignItems:'center',
  flexDirection:'row'

  

},
LineView:{
  marginLeft:12,
  marginTop:20,
  flexDirection:'row',
  alignItems:'center',
 

}
})

