import React, { Component } from 'react';
import { View, ImageBackground,StyleSheet,Image, AsyncStorage,TextInput,Text, ScrollView,Button,KeyboardAvoidingView, TouchableOpacity,Platform,FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NotificationView from '../components/NotificationView';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Content, Card, CardItem, Thumbnail, Icon } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePlaceholder from 'react-native-img-placeholder';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';


export default class ProfileScreen extends Component {



  constructor() {
 
    super();
 
    this.state = {

      data:[],
      image:null,
      profile:null,
      firstname:''
     
     
   
    }
  }





  Get_Data=()=>{



     let uploaddata = new FormData();         
        
           uploaddata.append('id',this.state.id);
           console.log("000000000000000000000000000000000 =>",this.state.id)
 
    let api = 'http://192.168.10.10/Api/testing.php?action=Display_user';
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

post_edit=(value)=>{

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



post_delete=()=>{

  let post_id=this.state.post_id
  // console.log('t==========================g',commentid)
  // this.setState({
  //   commentid:commentid,


  // })
  // // console.log('t==============g',commentid)

  let uploaddata = new FormData();         
      
  uploaddata.append('post_id',post_id);
  console.log("iddlllllllllllllddd =>",post_id)


  let api = 'http://192.168.10.10/Api/testing.php?action=delete_post';
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
        this.props.navigation.navigate("ProfileScreen")   
    
         
      })
      .catch((error) => {
          console.error(error);
      
      });



  
  

}


Get_like=(value)=>{

  let postid=value

  
  
  
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


  
componentDidMount=async()=>{
  let user = await AsyncStorage.getItem('customer');  
  console.log(user)
  let parsed = JSON.parse(user); 
  let id = parsed[0].id;
  let image = parsed[0].image;
  let firstname = parsed[0].firstname;

  let path = 'http://192.168.10.10/Api/uploads/'+image 
  console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiidddddddddddddddddddddddd=>',id)
  console.log('image pathtttttttttttttttttttttttttttttttttttttttttttttttt=>',image)
  console.log('pathpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp=>',path)
  console.log('pathpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp=>',firstname)
 

  this.setState({
    id:id,
    image:image,
    profile:path,
    firstname:firstname,

  })
  console.log('tg',path)

  this.Get_Data();
 }






 Update_Data=()=>{
         

  let uploaddata = new FormData();
  
  const newImage = {
    uri: this.state.profile,
    name: "my_photo.jpg",
    type: "image/jpg",
};
 


  uploaddata.append('image',newImage);
  uploaddata.append('id',this.state.id);
    console.log("hdbbh =>",this.state.id)

  // uploaddata.append('id',this.props.navigation.getParam('Id'),);

  //uploaddata.append('fcm_token',this.state.token);


  let api = 'http://192.168.10.10/Api/testing.php?action=update_profile';
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
        // let path = 'http://192.168.10.9/Api/uploads/'+response.response
        // console.log(path)
        // this.setState({
        //   profile:path
        // })
        AsyncStorage.getItem( 'customer' )
        .then( data => {
          data = JSON.parse( data );
         // console.log( data );
          // Decrement
          data[0].image = response.response;
         
          //console.log( data );
          //save the value to AsyncStorage again
          AsyncStorage.setItem( 'customer', JSON.stringify( data ) );
        }).done();
      })
      .catch((error) => {
          console.error(error);
      
      });
    
    
    
}



editfun=()=>{
  
  let post_id=this.state.post_id
  let post_title=this.post_title
  let post_ImageURL=this.post_ImageURL


  console.log('t==========================g',post_id)
  console.log('t==========================g',post_title)

  console.log('t==========================g',post_ImageURL)

  this.setState({
    post_id:post_id,
    post_title:post_title,
    post_ImageURL:post_ImageURL,


  })
 


   this.props.navigation.navigate('editPost', 
  {
    post_id:this.state.post_id,
   post_title:this.state.post_title,
   post_ImageURL:this.state.post_ImageURL,
  
 })
  console.log('00000000000000000000000000000000000',post_ImageURL)
   
   
  
  this.RBSheet1.open()

  
  

}
  
OpenRB=(value,value1,value2)=>{
  
  let post_id=value
  let post_title=value1
  let post_ImageURL=value2


  console.log('t==========================g',post_id)
  console.log('t==========================g',post_title)

  console.log('t==========================g',post_ImageURL)

  this.setState({
    post_id:post_id,
    post_title:post_title,
    post_ImageURL:post_ImageURL,


  })
 


  this.RBSheet1.open()
  

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
          let post_id = record[i].id
          let post_date = record[i].date
          let post_ImageURL = record[i].image
          let total_comments = record[i].total_comments
          let total_likes = record[i].total_likes
          let my_likes = record[i].my_like
        
      
          let hearttest = 'hearttest' + post_id
          let heart = 'heart' + post_id
          let path = 'http://192.168.10.10/Api/uploads/'+post_ImageURL
          console.log('post_idppppppppppppppppppppppppppppppppppppppppppp',post_id)
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
    source={{ uri:this.state.profile  }}
    borderRadius={50}
/>
                  {/* <Thumbnail source={require('../assets/wq.jpg')} style={{ width: 30, height: 30 }} /> */}
                  <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 12 }}>{this.state.firstname}</Text>
                    <Text style={{ fontSize: 12 }} note>{post_date}</Text>
                  </View> 
                </View>

                {/* <TouchableOpacity onPress={() => this.RBSheet1.open()}> */}
                <TouchableOpacity  onPress={() => this.OpenRB(post_id,post_title,post_ImageURL)} >

                <Icon name="dots-three-horizontal" type="Entypo" style={[styles.cardicon, { alignSelf: 'center' }]} />

                  <RBSheet
          ref={ref => {
            this.RBSheet1 = ref;
          }}
       
          height={200}
          openDuration={250}
          customStyles={{
      
          }}
      
        >
        
       <View style={{padding:10}}>
          
                 <Text style={{padding:12}}>Choose</Text>
                 
                 {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('editPost', 
                 {
                   post_id:post_id,
                  post_title:post_title,
                  post_ImageURL:post_ImageURL,
                  post_date:post_date,
                }
                  
                  
                 )}>
                 <Text style={{padding:12}}>edit</Text>
                 </TouchableOpacity> */}
                 <TouchableOpacity   onPress={() => this.editfun(post_id,post_title,post_ImageURL)}
>
                 <Text style={{padding:12}}>edit</Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => this.post_delete()}>
                 <Text style={{padding:12}}>delete</Text>
                 </TouchableOpacity>
                 </View>
        </RBSheet>
        </TouchableOpacity>
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
                    {this.state[hearttest] == false ?
<View>{my_likes != null ? <Icon name="thumbs-down" type="Entypo"  style={styles.cardicon} onPress={()=>{this.Delete_like(post_id)}} /> 
 :<Icon name="thumbs-up" type="Entypo" style={styles.cardicon1}  onPress={()=>{this.Get_like(post_id)}} />}</View> :
<View><Icon name={this.state[heart]} type="Entypo" size={42}  style={(this.state[heart]=="thumbs-down"? {color:"#319581",fontSize:20,  marginTop:5 }
:{color:"gray",fontSize:20,  marginTop:1})}  onPress={() => { this.changestatus(post_id) }} /></View>}


                    <Text style={styles.cardtext}>{total_likes}</Text>
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

    
  
    const takePhotoFromCamera = () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
        
      });
    }
  
    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(profile => {
        console.log(profile.path);
        this.setState({profile:profile.path})
        this.Update_Data()
      });
      
    }



    return (


 
    <ScrollView >
   <View style={styles.HeaderView}>

<View style={styles.Line}>


     
    
    <MaterialIcons name="arrow-back" size={35} color='white' style={{marginTop:-92,marginLeft:8}} />


    <View style={styles.LineView}>
  
    {/* <Image source={require('../assets/qw.png')}
    style={styles.ImageAvater}
   /> */}
  

<ImagePlaceholder
   style={styles.ImageAvater}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:this.state.profile}}
    placeholderStyle={styles.ImageAvater}
    borderRadius={50}
/>
    
    
    <View style={{marginTop:-40,marginLeft:80,backgroundColor:'black', width:30,height:30,borderRadius:15, justifyContent:'center'}}>

    <TouchableOpacity onPress={choosePhotoFromLibrary}> 
    <SimpleLineIcons name="camera" size={20} color='white' style={{alignSelf:'center'}} />
    </TouchableOpacity>

    </View>
     <Text style={{fontSize:32,color:'white',fontWeight:'bold',marginTop:14}}>{this.state.firstname}</Text>
    
</View>
<MaterialIcons name="message" size={30} color='white' style={{marginTop:-92,marginLeft:12}}  onPress={() =>
        navigation.navigate('chatroom', { name: 'Jane' })
      }/>
</View>
</View>

  <View style={styles.yss} >
      <View style={{flexDirection:'row', marginLeft:12}} >
         <TouchableOpacity >
           <View style = {styles.contaconine}>
           <TouchableOpacity onPress={() => navigation.navigate('postScreen')}>
            <Text style = {styles.text}>
              Add a post
            </Text>
            </TouchableOpacity>
            <MaterialIcons name="image" size={25} color='white' style={{marginLeft:-8}} />
            </View>
         </TouchableOpacity>
         <TouchableOpacity >
           <View style = {styles.contaconine}>
           <TouchableOpacity onPress={() => navigation.navigate('editProfile')}>
            <Text style = {styles.text}>
               Edit Profile
            </Text>
            </TouchableOpacity>
            <MaterialCommunityIcons name="account-edit-outline" size={25} color='white' style={{marginLeft:-8}} />
            </View>
         </TouchableOpacity>
      </View>
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
inpu: {

  padding:12,
 backgroundColor:'#e0e0e0',
 width:'70%',
 height:44,
 borderRadius:12
 
 },
header: {
    width: '100%',
    height: 100,
    backgroundColor: '#319581',
},
searchIcon: {
  padding: 10,
  
},
header1:{
    flexDirection:'row',
    width:'90%',
    alignSelf:'center',
},
mess:{

  maxWidth: '94%',
  maxHeight: '94%',
backgroundColor:'#e0e0e0',
borderRadius:18,
padding:10,
flexDirection:'column'






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
  fontSize: 20,
  marginTop:5
 
 
},
cardtext: {
  color: '#319581',
  marginLeft: 0,
  marginTop: 3
},
cardicon1: {
  color: 'gray',
  fontSize: 20,
  marginTop:1
},
})

