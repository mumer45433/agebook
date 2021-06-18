import React from 'react';
import { View, Text,Button, ImageBackground,StyleSheet,Image } from 'react-native';





const AgeBookScreen=({navigation})=>{

  setTimeout(()=>{
    navigation.navigate('loginScreen');
  }, 3000);

  return(



    <ImageBackground source={require('../assets/splashscreen.png')}
    style={styles.image}
    > 
    <View style={styles.container}>
     
      <Image source={require('../assets/agetext.png')}
      style={styles.textage}
      />
    
    </View>



    </ImageBackground>

    
  )
}

const styles=StyleSheet.create({
  image:{
    resizeMode: "center",
            height: '100%',
            width: '100%'
  },
  textage:{
    height: '12%',
    width: '84%',
    resizeMode: "center",
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default AgeBookScreen;