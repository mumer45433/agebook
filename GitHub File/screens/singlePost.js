import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image,FlatList,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NotificationView from '../components/NotificationView';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {  Content, Card, CardItem, Thumbnail, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePlaceholder from 'react-native-img-placeholder';

export default class singlePost extends Component {



    constructor() {
 
        super();
     
        this.state = {
    
          data:[],
          post_title:'',
          post_id:'',
          post_date:'',
          post_ImageURL:''
         
         
       
        }
      }
    
    
    
      Get_Data=()=>{
    
    
    
        let uploaddata = new FormData();         
           
              uploaddata.append('post_id',this.props.route.params.post_id);
              console.log("1111111111111111111111111111111=>",this.props.route.params.post_id)
    
       let api = 'http://192.168.10.11/Api/testing.php?action=Single_user';
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
                data:response.response
              })
    
              let table = []
              let record = this.state.data
     let len = record.length
    
     console.log('tttaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',record)
      if (record != 'fail') {
          for (let i = 0; i < len; i++) {
            let post_title = record[i].title
            let post_date = record[i].date
            let post_ImageURL = record[i].image

            let total_likes = record[i].total_likes
            let total_comments = record[i].total_comments
            
            let path = 'http://192.168.10.11/Api/uploads/'+post_ImageURL
            console.log('pattt',path)
        
            this.setState({
                post_title:post_title,
                post_date:post_date,
                post_ImageURL:post_ImageURL,
                path:path,
                total_likes:total_likes,
                total_comments:total_comments
              })
      
            let test = {
                post_title:post_title,
                post_date:post_date,
                path:path,
          
             
            }
         
                   
            
            table.push(
              test
          
               )
               console.log('tabbbbb=>',table)
          }}
          this.setState({
            table:table
          })
                  
           })
           .catch((error) => {
               console.error(error);
           
           });
         
        
    }
  
    

      
    
    

        
    componentDidMount() {

    

        let user_firstname= this.props.route.params.user_firstname;
        let user_ImageURL= this.props.route.params.user_ImageURL;
        
        console.log("opvvvvvvvhbhghgggghhhhhhhhhhhhvvvv111111111111111111111111111111111111111=====",user_firstname);
     
    
      this.setState({
     
        user_firstname:user_firstname,
        user_ImageURL:user_ImageURL
     
    })
    
    
    console.log("opvvvvvvvhbhghgggghhhh=====",user_firstname);
 
    
     
this.Get_Data();
    
     
     }
    


  render() {

    const { navigation } = this.props;

    
  



    return (
   

  
      <View style={{flex:1}} >

   
<Text style={{fontSize:26, marginHorizontal:140, marginTop:12,color:'#25919d'}}>Post</Text>

   
   
    {/* {this.createtable1()} */}

    <Content  >
            
           
            <Card>
                <ImageBackground source={require('../assets/chat.png')} resizeMode='stretch' style={styles.container1}>
                  <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                    <ImagePlaceholder
      //  style={{ height: 200, width: null, flex: 1 }}
       style={{ width: 30, height: 30 }}
        loadingStyle={{ size: 'large', color: 'blue' }}
         source={{ uri:'http://192.168.10.11/Api/uploads/'+this.state.user_ImageURL  }}
        borderRadius={50}
    />
                      {/* <Thumbnail source={require('../assets/wq.jpg')} style={{ width: 30, height: 30 }} /> */}
                      <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 12 }}>{this.state.user_firstname}</Text>
                        <Text style={{ fontSize: 12 }} note>{this.state.post_date}</Text>
                      </View>
                    </View>
                    <Icon name="dots-three-horizontal" type="Entypo" style={[styles.cardicon, { alignSelf: 'center' }]} />
                  </View>
                  <View style={{marginHorizontal:12,marginVertical:4}}>
                  <Text style={{ fontSize: 16 }}>{this.state.post_title}</Text>
                  </View>
                  <CardItem cardBody>
                  <ImagePlaceholder
       style={{ height: 200, width: null, flex: 1 }}
        loadingStyle={{ size: 'large', color: 'blue' }}
        source={{ uri:this.state.path  }}
    />
                  </CardItem>
                    <View style={{ flexDirection: 'row', width: '95%', alignSelf: 'center', paddingVertical: 15, justifyContent: 'space-between' }}>
                      <TouchableOpacity style={{flexDirection:'row'}}>
                        <Icon name="thumbs-up" style={styles.cardicon} />
                        <Text style={styles.cardtext}>{this.state.total_likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity  style={{flexDirection:'row' }}>
                        <Icon name="chatbubbles" style={[styles.cardicon, { marginTop:2 }]} />
                        <Text style={[styles.cardtext, {}]}>{this.state.total_comments}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity  style={{ flexDirection:'row'}}>
                        <Icon name="share" type="FontAwesome" style={[styles.cardicon,{marginTop:5}]} />
                        </TouchableOpacity>
                        </View>
                </ImageBackground>
              </Card>
    
           
          </Content>
 
           
      
   
  
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

