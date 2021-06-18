import React, { Component } from 'react';
import { View, Text, ImageBackground,StyleSheet,Image, TextInput,Button, ScrollView ,Picker,TouchableOpacity,AsyncStorage,FlatList,Platform} from 'react-native';

import LoginButton from '../components/LoginButton';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePlaceholder from 'react-native-img-placeholder';
import DatePicker from 'react-native-datepicker'


export default class editPost extends Component { 

    constructor(props) {
 
        super(props)
     
        this.state = {
     
          post_id: '',
          post_title: '',
          post_ImageURL:null,
          // profile:null,
          // image:null,
     
          
      
     
        }
     
      }
    
    
    
      Update_Data=()=>{
             
    
        let uploaddata = new FormData();
               let post_id = this.state.post_id
               let post_title = this.state.post_title

           
               
             
               const newImage = {
                uri: this.state.post_ImageURL,
                name: "my_photo.jpg",
                type: "image/jpg",
            };
    
    
        uploaddata.append('post_id', post_id);
        uploaddata.append('post_title',post_title);
        uploaddata.append('image',newImage);



       
        
     
        console.log("hdbbh =>",post_id)
    
        //uploaddata.append('fcm_token',this.state.token);
    
      
        let api = 'http://192.168.10.11/Api/testing.php?action=update_post';
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
           
        this.props.navigation.navigate("ProfileScreen")   
          
             
                   
            })
            .catch((error) => {
                console.error(error);
            
            });
            // this.props.navigation.navigate('Dho');
          
          
    }

    componentDidMount(){
        let post_id= this.props.route.params.post_id;
        let post_title= this.props.route.params.post_title;
        let post_ImageURL= this.props.route.params.post_ImageURL;
        let post_date= this.props.route.params.post_date;
        let path = 'http://192.168.10.11/Api/uploads/'+this.props.route.params.post_ImageURL;
        
      
        this.setState({
            post_id:post_id,
            post_title:post_title,
            post_ImageURL:post_ImageURL,
            post_date:post_date,
            post_ImageURL:path,
      
        })
        console.log('post_id00000000000000000000000000000000000000',post_id)
        console.log('post_title11111111111111111111111111111',post_title)
        console.log('post_title11111111111111111111111111111',post_ImageURL)
        console.log('post_title11111111111111111111111111111',post_date)

      
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
      }).then(post_ImageURL => {
        console.log(post_ImageURL.path);
        this.setState({post_ImageURL:post_ImageURL.path})
       
      });
      
    }


    

  return(
    
  
      






    <View style={styles.container}>
    <View style={{marginHorizontal:97,marginBottom:23}}>
    <Text style={{fontSize:30,color:'#459386',fontWeight:'bold'}}>Edit Post</Text>
     </View>
   


   



     {/* <Image source={require('../assets/qw.png')}
    style={styles.ImageAvater}/> */}


       <TextInput
      placeholder="Write your title here"
      placeholderTextColor='gray'
  value={this.state.post_title}

      style={styles.textinput}
      onChangeText={text => this.setState({post_title:text})}
      />



{/* <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity> */}

      <View style={{padding:10,paddingVertical:12}}>
      <TouchableOpacity onPress={choosePhotoFromLibrary}>
        {/* <Text style={styles.panelButtonTitle}>Choose From Library</Text> */}
     
       {this.state.post_ImageURL==null?<View style={styles.panelButton}> 
        
          <AntDesign name="cloudupload"  color='white' size={45} style={{marginLeft:16,marginTop:-22}} />
          <Text style={{color:'gray'}}>Take a photo</Text>
       </View>:<ImagePlaceholder
   style={styles.ImageAvater}
    loadingStyle={{ size: 'large', color: 'blue' }}
   
    source={{ uri:this.state.post_ImageURL  }}


    // placeholderStyle={styles.ImageAvater}
 
/>}







{/* <ImagePlaceholder
      style={styles.ImageAvater}
    loadingStyle={{ size: 'large', color: 'blue' }}
    source={{ uri: 'https://via.placeholder.com/300/09f/fff.png' }}
/> */}
      </TouchableOpacity>
      </View>
   
      

      


    
   




  
      





     
   
      <LoginButton     onPress={()=>{this.Update_Data()}} >Save</LoginButton>


         
    
 

    </View>

   
  
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
    borderColor:'gray',
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

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 ,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
 
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
   TextStyle : {
    color:'#fff',
    textAlign:'center'
},
date: {
      
  height: 30,
  marginTop:8,
  width: 307,
  borderRadius:2 

 

},
panelButton:{
width:300,
height:150,
backgroundColor:'lightgray',
padding:35,
paddingTop:59,
paddingHorizontal:108


},

TouchableOpacityStyle:{
    paddingTop:10,
    paddingBottom:10,
    marginTop:20,
    borderRadius:5,
    marginBottom:7,
    width:'90%',
    backgroundColor:'#00BCD4'
},
ImageAvater:{
  width:300,
  height:250,
  resizeMode: "contain",

  borderWidth:2,
  borderColor:'gray'
 
 
},

   pick:{
      
       width: 290, 
      
       color:'#6CCBB0',
 
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
   
   image:{
    width:200,
    height:200,
    marginTop:30
},
   pickk:{
    
      width: 138, 
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
      
    height: 44,
    marginTop:8,
    width: 307, 
    borderWidth:2,
    backgroundColor:'gray'

   

  },
  yes:{

    marginLeft:32


  }
})

