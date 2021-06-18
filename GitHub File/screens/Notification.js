import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image,FlatList,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NotificationView from '../components/NotificationView';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePlaceholder from 'react-native-img-placeholder';
export default class Notification extends Component {



  constructor() {
 
    super();
 
    this.state = {

      data:[],
    
      
     
     
   
    }
  }

  Get_Notification=()=>{

    let uploaddata = new FormData();  

    uploaddata.append('userid',this.state.userid);
    console.log("useriduseriduserid=>",this.state.userid)


   let api = 'http://192.168.10.11/Api/testing.php?action=Get_Notification';
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
           data:response.response,
          
         })
              
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
    userid:id,


  })

this.Get_Notification();




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
        let user_message = record[i].message
        let user_date = record[i].date
        let id = record[i].id
        let user_firstname = record[i].firstname
        let user_ImageURL = record[i].user_image
        let post_id = record[i].post_id

       
    
        let total_comments = record[i].total_comments
         let total_likes = record[i].total_likes
         let user_iid = record[i].user_idd
        // let total_comments = record[i].total_comments
        // let total_likes = record[i].total_likes
        // let path = 'http://192.168.10.11/Api/uploads/'+post_ImageURL
        console.log('user_firstnameuser_firstnameuser_firstname',post_id)
table.push(<View>
{
  <View>


<View >
   
<TouchableOpacity   onPress={() => this.props.navigation.navigate('singlePost', 
                  { 
                    user_iid:user_iid, 
                    user_firstname:user_firstname,
                    user_ImageURL:user_ImageURL,
                    total_comments:total_comments,
                    total_likes:total_likes,
                    post_id:post_id
                    }
                  
                  
                  )} >
    <View style={styles.FriendListView}>

     
    <ImagePlaceholder
  
  style={{
    width:40,
    height:40,
  borderRadius:20,
    marginLeft:12,
    margin:4
  }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:'http://192.168.10.11/Api/uploads/'+user_ImageURL  }}
    borderRadius={50}
/>
 
   
    <Text style={styles.Text} numberOfLines={1} ellipsizeMode="tail">{user_firstname}</Text>
  
    <Text style={styles.Age} numberOfLines={1} ellipsizeMode="tail"> {user_message}</Text>
    <View style={styles.actions}>
   
    <EvilIcons name="like" size={30}  color="red" 
         
         onPress={() => {
           editChildHandler(itemData.item.id);
         }}/>
   
   </View> 
            <Text style={styles.time} numberOfLines={1} ellipsizeMode="tail"> {user_date}</Text>
            
     
            </View>
    
</TouchableOpacity>
    
    </View>
    
     
      
  
    
    
   
  
  

 
     
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
   

  
      <View style={styles.container}>

   
<Text style={{fontSize:26, marginHorizontal:140, marginTop:12,color:'#25919d'}}>Newer</Text>

   
   
    {this.createtable1()}



           
      
   
  
    <Text style={styles.line} numberOfLines={1} ellipsizeMode="tail">       ------------Older-------------    </Text>
</View>
     
      
 
    
   
 

  )
}
}

 
export const screenOptions = navData => {
 return {
    headerTitle: 'Notifications',
    headerLeft: () => (
           
      <MaterialIcons name={Platform.OS === "ios" ? "keyboard-arrow-left" : "keyboard-arrow-left" } color='white' size={45} style={{marginLeft:16,marginTop:-22}} />
   
    ),
   
    headerRight: () => (
         
      <Entypo name={Platform.OS === "ios" ? "dots-three-vertical" : "dots-three-vertical" } color='white' size={25} style={{marginRight:18,marginTop:-22}} />
   
    ),
    headerTitleStyle: {
      fontSize: 26,
      marginTop:-24
    },
    headerTintColor: 'white',
    headerStyle: {
      height: 90,
      backgroundColor:'#25919d',
      
    },
    headerTitleAlign:'center',
   
  };
  
  
};


const styles=StyleSheet.create({ 
  image:{
    resizeMode: "center",
            height: '100%',
            width: '100%'
  },
  textage:{
    height: '12%',
    width: '84%'
  },
  container:{
    flex:1,

  } ,
      list:{
       
        padding:12
      },
      line:{
        marginHorizontal:12,
        fontSize:26,
        color:'#25919d'
      },
       
    FriendListView: {

      flexDirection:'row',
       
     
    
      
       alignItems:'center',
      
      
      
       
       
     },
     Container:{
         flex:1
     },
     actions: {
     
      flexDirection:'row',
      marginLeft:10
     
     },
     pic:{
       width:40,
       height:40,
       borderRadius:20,
       margin:8,
       marginHorizontal:22
     },
     Age:{
   
   width:90,

     },
     Text:{
   marginHorizontal:3,
   fontSize:14,
   width:90,
   
   fontWeight:'bold'
   
     },
     time:{
       marginLeft:0
     }
})

