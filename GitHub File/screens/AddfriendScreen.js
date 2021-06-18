import React, { Component } from 'react';
import { View, ImageBackground,StyleSheet,Image, AsyncStorage,TextInput,Text, ScrollView,Button, TouchableOpacity,Platform,FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationView from '../components/NotificationView';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Content, Card, CardItem, Thumbnail, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePlaceholder from 'react-native-img-placeholder';


export default class AddfriendScreen extends Component {



  constructor() {
 
    super();
 
    this.state = {

      data:[],
      image:null,
      profile:null,
      firstname:'',
      
     
     
   
    }
  }



  Get_Data=()=>{



    let uploaddata = new FormData();         
       
          uploaddata.append('id',this.props.route.params.user_iid);
          console.log("1111111111111111111111111111111=>",this.props.route.params.user_iid)

   let api = 'http://192.168.10.10/Api/testing.php?action=Display_post';
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


friend_request=()=>{


    
      let uploaddata = new FormData();  
  
         
            uploaddata.append('friend_id',this.props.route.params.user_iid);
            console.log("iddddd =>",this.props.route.params.user_iid)
            uploaddata.append('user_id',this.state.user_id);
           
            console.log("user_iduser_iduser_iduser_iduser_iduser_iduser_id =>",this.state.user_id)
    
     let api = 'http://192.168.10.10/Api/testing.php?action=friend_request';
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
    




  
  componentDidMount=async()=> {

    let user = await AsyncStorage.getItem('customer');  
    // console.log(user)
    let parsed = JSON.parse(user); 
    let id = parsed[0].id;

    let user_iid= this.props.route.params.user_iid;
    let firstname= this.props.route.params.firstname;
    let user_ImageURL= this.props.route.params.user_ImageURL;
    let total_likes= this.props.route.params.total_likes;
    let total_comments= this.props.route.params.total_comments;
    
    console.log("opvvvvvvvhbhghgggghhhhhhhhhhhhvvvv=====",user_iid);

  this.setState({
    user_iid:this.props.route.params.user_iid,
    firstname:firstname,
    user_ImageURL:user_ImageURL,
    user_id:id,
    total_likes:total_likes,
    total_comments:total_comments
 
})


console.log("opvvvvvvvhbhghgggghhhh=====",user_ImageURL);
this.Get_Data();

 
//   console.log('tg',path)

 
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
          let post_title = record[i].title
          let post_date = record[i].date
          let post_ImageURL = record[i].image
          let total_comments = record[i].total_comments
          let total_likes = record[i].total_likes
          let path = 'http://192.168.10.10/Api/uploads/'+post_ImageURL
          console.log('pattt',path)
  table.push(<View>
  {
    <View>
        <Content  >
        
       
        <Card>
            <ImageBackground source={require('../assets/chat.png')} resizeMode='stretch' style={styles.container1}>
              <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 10, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                <ImagePlaceholder
  //  style={{ height: 200, width: null, flex: 1 }}
   style={{ width: 30, height: 30 }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:'http://192.168.1.14/Api/uploads/'+this.state.user_ImageURL  }}
    borderRadius={50}
/>
                  {/* <Thumbnail source={require('../assets/wq.jpg')} style={{ width: 30, height: 30 }} /> */}
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 12 }}>{this.state.firstname}</Text>
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
   style={{ height: 200, width: null, flex: 1 }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:path  }}
/>
              </CardItem>
                <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 15, justifyContent: 'space-between' }}>
                  <TouchableOpacity style={{flexDirection:'row'}}>
                    <Icon name="thumbs-up" style={styles.cardicon} />
                    <Text style={styles.cardtext}>{total_likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={{flexDirection:'row' }}>
                    <Icon name="chatbubbles" style={[styles.cardicon, { marginTop:2 }]} />
                    <Text style={[styles.cardtext, {}]}>{total_comments}</Text>
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
   <View style={styles.HeaderView}>

<View style={styles.Line}>


     
    
    <MaterialIcons name="arrow-back" size={35} color='white' style={{marginTop:-92,marginLeft:8}} />


    {/* <View style={styles.LineView}> */}
  
    {/* <Image source={require('../assets/qw.png')}
    style={styles.ImageAvater}
   /> */}
  

<ImagePlaceholder
   style={styles.ImageAvater}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:'http://192.168.10.10/Api/uploads/'+this.state.user_ImageURL}}
    placeholderStyle={styles.ImageAvater}
    borderRadius={50}
/>

<MaterialIcons name="message" size={30} color='white' style={{marginTop:-92,marginLeft:12}}  onPress={() =>
        navigation.navigate('chatroom', { user_iid: this.state.user_iid })
      }/>

{/* </View> */}

</View>

    
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:15}}>
  
     <Text style={{fontSize:28,color:'white',fontWeight:'bold',marginRight:-2,width:170}}>{this.state.firstname}</Text>
   
         <TouchableOpacity >
           <View style = {styles.contaconine}>
           <Ionicons name="md-person-add" size={22} color='black' style={{marginLeft:18}} />
           <TouchableOpacity  onPress={()=>{this.friend_request()}} >
            <Text style = {styles.text}>
              Add friend
            </Text>
            </TouchableOpacity>
          
            </View>
         </TouchableOpacity>
         </View>
   
         </View>


  <View style={styles.yss} >
    
  {this.createtable1()}
   </View>  
       </ScrollView>
  )}}



const styles=StyleSheet.create({
  container:{
    flex:1,


   
  },
  HeaderView:{
    backgroundColor:'#25919d',
    height:210,
   
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
    backgroundColor: 'white',
    flexDirection:'row',
    alignItems:'center',
    width:130,
    height:33,
    marginLeft:26,
    borderRadius:4,

  
 },
 text: {
  color:'black',
  padding:5,
  paddingHorizontal:5,
  fontSize:15


 },
  yss:{
      marginVertical:20,
      marginBottom:1

  },
  Line:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:30,
    // justifyContent:'center',
    marginBottom:20
    

  },
  LineView:{
    
  

 
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
  fontSize: 20
},
cardtext: {
  color: '#319581',
  marginLeft: 0,
  marginTop: 3
},
})

