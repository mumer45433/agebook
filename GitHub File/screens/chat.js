import React, { Component } from 'react';

import { View, Text, ImageBackground,StyleSheet,Image,FlatList,TextInput,AsyncStorage,TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MessageView from '../components/MessageView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePlaceholder from 'react-native-img-placeholder';


export default class chatroom extends Component {

  constructor() {
 
    super();
 
    this.state = {

      data1:[],
    
    }
  }
  getchatlist=()=>{

  
    
    let uploaddata = new FormData();         
        
    uploaddata.append('user_id',this.state.user_id);

    console.log("idpppppppppppppppppppppppppppppppppppppppppppp =>", this.state.user_id)


    let api = 'http://192.168.10.10/Api/testing.php?action=get_chat_list_for_user';
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
 



  componentDidMount = async () => {

        

    // console.log("chat status is = "+ this.props.status)
   let user = await AsyncStorage.getItem('customer');

   let parsed = JSON.parse(user);
   let id = parsed[0].id;
   console.log("id000000000000000000000000000000000000000000000000000000000000000000 =>", id)
   this.setState({
       user_id: id,
       
   })
   this.getchatlist()
}




// createTable = () => {
//   let table = []

//   let hasRecord = this.state.data1
//   let len =hasRecord.length
// console.log("hasrecord => ",hasRecord)

//   if (hasRecord != '') {

//       for (let i = 0; i < len; i++) {

//           let name = hasRecord[i].chat_name
//           console.log("name is => ",name)
//           let vendor_id = hasRecord[i].vendor_id
//           let id = hasRecord[i].id
          
//            let image = hasRecord[i].photo
//            let finalimage = null
//            if (image != null) {
//               finalimage = 'https://relyconnects.com/uploads/' + image;
//           }
//               table.push(<View>
//                   {
//                        <TouchableOpacity   style={[styles.section,{justifyContent:'flex-start',width:'100%',backgroundColor:'#f9f9f9',padding:5,marginTop:5,flexDirection:'column'}]} onPress={()=>{Actions.chatroom({chatid:id,vendorid:vendor_id,value1:name})}}>
//                            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
//                        <View style={{width:'20%',flexDirection:'column',justifyContent:'center',marginLeft:10,marginTop:5}}>
//                        {image==null?<Image source={require('./images/avatar.png')} style={[styles.avatar,{marginLeft:1}]} />:
//                               <Image source={{
//                                   uri: finalimage,
//                                   method: 'POST',
//                                   headers: {
//                                       Pragma: 'no-cache'
//                                   },
//                                   body: 'Your Body goes here'
//                               }} style={{
//                                   width:60,
//     height:60,
//     borderRadius:50,
//     marginLeft:1,
                                 
//                               }} />}
//                    </View>
//                    <View style={{width:'80%',flexDirection:'column',justifyContent:'center',}}>
//                        <View style={{flexDirection:'row'}}>
//                    {/* <Icon type="FontAwesome" name="circle" style={[styles.menuicon,{fontSize:16,marginTop:5,marginRight:5,color:"#66ff00"}]}  /> */}
//                    <Text style={[styles.vittext,{fontSize:18,marginBottom:5}]}>{name}</Text>
//                    </View>
//                    <Text style={{fontSize:12,fontStyle:'normal',color:'gray',marginTop:25}}>Active Now</Text>
//                    </View>
//                    </View>
//                    {/* <View style={{marginTop:0,marginLeft:'22%'}}>
//                      <Text style={{fontSize:12,}}>Now Online</Text>
                     

//                      </View> */}

//                    </TouchableOpacity>

//                   }
//               </View>
//               )
//            }
        
           
      
//       return table
//   }
//   else {
//       let img = []
//       console.log("helo")
//       img.push(<View style={{ flex: 1, justifyContent: 'center' ,height:500}} >
//           {

//               <View style={styles.logoview}>
//                   <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:'10%'}}>No Record</Text>
//               </View>
//           }</View>)

//       return img
//   }
// }



createtable1 = () => {
  let table = []
  // console.log(hasRecord)
  // let len = this.state.campaignlist.length;
  // let hasRecord = this.state.campaignlist;
let record = this.state.data1
 let len = record.length
  if (record != 'fail') {
      for (let i = 0; i < len; i++) {
        // let id = record[i].id
        let chat_name = record[i].chat_name
        let chat_image = record[i].chat_image
        let id = record[i].id
        let receiver_id = record[i].receiver_id
        let sender_id = record[i].sender_id
       
       
        console.log('chat_name000000000000000000000',chat_name)
        console.log('chat_image00000000000000',chat_image)
        console.log('id000000000000000000000000',id)
          let path = 'http://192.168.10.10/Api/uploads/'+chat_image
        // console.log('nameoooooooooooooooooo',name)
table.push(<View>
{
  <View>
  <TouchableOpacity activeOpacity={0.2}  onPress={() => this.props.navigation.navigate('chatroom', 
                  { 
                    chat_iiid:id, 
                    receiver_id:receiver_id, 
                    sender_id:sender_id
                   

                
                    }
                  
                  
                  )} >

<View style={styles.FriendListView}>
<ImagePlaceholder
  //  style={{ height: 200, width: null, flex: 1 }}
  style={{
    width:50,
    height:50,
  borderRadius:20,


 
  }}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri:path  }}
    borderRadius={50}
/>
<View style={{flexDirection:'column', }}>
<Text style={styles.Text} numberOfLines={1} ellipsizeMode="tail">{chat_name}</Text>

<Text style={styles.Age} numberOfLines={1} ellipsizeMode="tail"> {chat_name}</Text>
</View>

<MaterialCommunityIcons name="numeric-3-circle" size={25}  color="red" style={{marginTop:4,marginHorizontal:12}}
         
         onPress={() => {
           editChildHandler(itemData.item.id);
         }}/>
       
     
        

 
  
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

  render() {

    const { navigation } = this.props;

    
  



    return (
   
<View style={styles.container}>
<View >
   
   </View>
   <TextInput
        style={styles.input}
        underlineColorAndroid = "transparent"
     
        placeholderTextColor = "white"
         
        placeholder="Search"
        keyboardType="numeric"
        backgroundColor='#dcdcdc'
      />

<View style={styles.list}>
  {this.createtable1()}

{/* <FlatList
numColumns={1}
  data={avatar}
  renderItem={ ({item}) => (
     
    <TouchableOpacity activeOpacity={0.2} >
    <View style={styles.Container}>
<View style={styles.FriendListView}>
<Image source={props.src} style={{
  width:50,
  height:50,
borderRadius:25,
  margin:4,
}}></Image>
<View style={{flexDirection:'column', }}>
<Text style={styles.Text} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>

<Text style={styles.Age} numberOfLines={1} ellipsizeMode="tail"> {props.Comd}</Text>
</View>

<View style={styles.actions}>
{props.children}
        </View>
       
     
        

 
  
</View>


</View>

</TouchableOpacity>
 
 
    
  )}/> */}
  </View>
  
 
</View>
  )
}
}

 
export const screenOptions = navData => {
 return {
    headerTitle: 'Messages',
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
      }, input: {
        height: 40,
        margin: 12,
        textAlign:'center',
        fontSize:16,
        borderRadius:3
      
      },
      FriendListView: {

        flexDirection:'row',
         
       marginBottom:12,
      
        
         alignItems:'center',
        
        
        
         
         
       },
       Container:{
           flex:1
       },
       actions: {
       
        flexDirection:'row',
        marginLeft:50
       
       },
       pic:{
         width:80,
         height:80,
         borderRadius:40,
         margin:8,
         marginHorizontal:22
       },
       Age:{
     
     width:180,
     color:'green',
     fontSize:10,
     marginHorizontal:8,
     
       },
       Text:{
     marginHorizontal:8,
     
     fontSize:16,
     width:110,
     
     fontWeight:'bold'
     
       },
       time:{
         marginLeft:0
       }
})

