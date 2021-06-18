import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image,FlatList, ScrollView,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';

import { Container, Header, InputGroup, Input, Icon, Button,Item } from 'native-base';
import FriendListView from '../components/FriendListView';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fabs from '../components/Fabs';
import ImagePlaceholder from 'react-native-img-placeholder';

import HeaderButton from '../components/HeaderButton';

export default class FriendListScreen extends Component { 


  constructor(props) {
 
    super(props)
 
    this.state = {
 
      data:[],
      data1:[],
      image:null,
      profile:null,
      firstname:'',
      
 
    }
 
  }

  

  friends_request=()=>{



    let uploaddata = new FormData();         
       
          uploaddata.append('myid',this.state.myid);
          console.log("1111111111111111111111111111111=>",this.state.myid)

   let api = 'http://192.168.10.11/Api/testing.php?action=friend_list';
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
         
       


         let record = response.response
     
         let len = record.length

console.log('tttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',record)
 if (record != 'fail') {
   let pendingarray=[];
   let confirmedarray=[];
     for (let i = 0; i < len; i++) {
       let status = record[i].status
i
       console.log('status===================',status)

     if(status=="panding"){
       pendingarray.push(record[i])
     }
     else if(status=="confirm")
     {
       confirmedarray.push(record[i])
     }

   // console.log('tabbbbb=>',table)
     }
     this.setState({
       data:pendingarray,
       data1:confirmedarray
     })
    
    }
    
              
       })
       .catch((error) => {
           console.error(error);
       
       });
     
    
}


Update_Request=(value)=>{
         let confirm_id=value;


  let uploaddata = new FormData();         
       
  uploaddata.append('confirm_id',confirm_id);

 
  console.log("2222222222222222222222=>",confirm_id)
  //uploaddata.append('fcm_token',this.state.token);


  let api = 'http://192.168.10.11/Api/testing.php?action=confirm_request';
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
        this.friends_request();
       
             
      })
      .catch((error) => {
          console.error(error);
      
      });
   
    
    
}


componentDidMount=async()=> {

  let user = await AsyncStorage.getItem('customer');  
  // console.log(user)
  let parsed = JSON.parse(user); 
  let myid = parsed[0].id;


  
  console.log("opvvvvvvvhbhghgggghhhhhhhhhhhhvvvv=====",myid);

this.setState({
  myid:myid

})

console.log("opvvvvvvvhbhghgggghhv=====",myid);


this.friends_request();


//   console.log('tg',path)


}



createtable2 = () => {
  let table = []
  // console.log(hasRecord)
  // let len = this.state.campaignlist.length;
  // let hasRecord = this.state.campaignlist;
let record = this.state.data1
 let len = record.length
//console.log(hasRecord[0])
  if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        let friendrequest_id = record[i].user_id
        let user_firstname = record[i].firstname
        let user_ImageURL = record[i].user_image
        // let total_comments = record[i].total_comments
        // let total_likes = record[i].total_likes
        // let path = 'http://192.168.10.11/Api/uploads/'+post_ImageURL
        console.log('friendrequest_idfriendrequest_idfriendrequest_id',friendrequest_id)
table.push(<View>
{
  <View>
 <TouchableOpacity activeOpacity={0.2} >
    <View style={{flexDirection:'row'}}>

          <ImagePlaceholder
  
  style={{
    width:60,
    height:60,
  
   
   borderRadius:4,
    margin:12,
   
  }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:'http://192.168.10.11/Api/uploads/'+user_ImageURL  }}
    // borderRadius={50}
/>
   
      
    </View>
    </TouchableOpacity>
     
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
        let friendrequest_id = record[i].user_id
        let confirm_id = record[i].id
        let user_firstname = record[i].firstname
        let user_ImageURL = record[i].user_image
        // let total_comments = record[i].total_comments
        // let total_likes = record[i].total_likes
        // let path = 'http://192.168.10.11/Api/uploads/'+post_ImageURL
        console.log('confirm_idconfirm_idconfirm_idconfirm_id',confirm_id)
table.push(<View>
{
  <View>

    <View style={styles.FriendListView}>
    {/* <Image source={props.src} style={{
      width:40,
      height:40,
    borderRadius:20,
      margin:6,
    }}></Image> */}
          <ImagePlaceholder
  
  style={{
    width:40,
    height:40,
  borderRadius:20,
    margin:6,
  }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:'http://192.168.10.11/Api/uploads/'+user_ImageURL  }}
    borderRadius={50}
/>
    <Text style={styles.Text} >{user_firstname}</Text>
    <Text style={styles.Age} >Age {friendrequest_id}</Text>
  
    <View style={styles.actions}>
    <TouchableOpacity activeOpacity={0.2}    onPress={()=>{this.Update_Request(confirm_id)}}>
    <Image source={require('../assets/c.png')}
      style={styles.textage}/>
         </TouchableOpacity>
         <TouchableOpacity activeOpacity={0.2} >
   <Image source={require('../assets/i.png')}
      style={styles.textage}/>
         </TouchableOpacity>
            </View>
     
      
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



  return(
    <View style={styles.container}>
      <ScrollView>
    <View >
    <TextInput
        style={styles.input}
        underlineColorAndroid = "transparent"
     
        placeholderTextColor = "white"
         
        placeholder="Search"
        keyboardType="numeric"
        backgroundColor='#dcdcdc'
      />
   </View>
    




      
<View style={styles.list}>
  <Text style={{fontSize:24, marginHorizontal:88, marginTop:-20,color:'#25919d'}}>Your Friends</Text>
  {this.createtable2()}
{/* <FlatList
numColumns={4}
 
 
  data={images}
  renderItem={ ({item}) => (
    <Image source={item.src} style={{
      width:60,
      height:60,
    
     
     borderRadius:4,
      margin:12,
     
    }}></Image>
  )}
/> */}
<Text style={{fontSize:24, marginHorizontal:78, marginTop:10,color:'#25919d',marginBottom:20}}>Friend Request</Text>
{this.createtable1()}
  </View>


  {/* <FlatList
numColumns={1}
  data={avatar}
  renderItem={ ({item}) => (
     
   <FriendListView
   
   name={item.name}
   Age={item.Age}
   src={item.src}
 
   > 
   
   <Image source={require('../assets/c.png')}
      style={styles.textage}/>
   <Image source={require('../assets/i.png')}
      style={styles.textage}/>
  
         
       

 
 </FriendListView>
    
  )}/> */}
   </ScrollView>
  <Fabs/>
 
  </View>
  





  )
}

}

export const screenOptions = navData => {





  return {
    headerTitle: 'Your Order\\s',
 
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  container: {
flex:1,
 
  },
  item: {
 marginHorizontal:20,
 
  
    backgroundColor:'pink',
    marginTop:60,
    fontSize:24,
    padding:10
  },
  list:{
    paddingTop: 26,
    marginHorizontal:15
  },
  textage:{
    marginHorizontal:3,
    width:60,
    height:25
  },
  input: {
    height: 40,
    margin: 12,
    textAlign:'center',
    fontSize:16,
    borderRadius:3
  
  },
  FriendListView: {

    flexDirection:'row',
     
     
    
     alignItems:'center',
   
   
    
     
     
   },
   actions: {
   
    flexDirection:'row',
    marginLeft:48,
    marginBottom:-4
   
   },
   pic:{
     width:40,
     height:40,
     borderRadius:20,
     margin:8,
     marginHorizontal:22
   },
   Age:{
 marginHorizontal:-30,
 fontSize:16,
 color:'#25919d'
 
   },
   Text:{
 marginHorizontal:4,
 width:110,
 
 fontSize:14,
 
 fontWeight:'bold'
 
   }
});

