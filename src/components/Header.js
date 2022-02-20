import React , {useState} from 'react';
import {TouchableOpacity, ImageBackground , StyleSheet, Text, View , TextInput, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';


export default function Icon(props) {
    const [loaded] = useFonts({
        Montserrat: require('../../assets/fonts/Amiri-Regular.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
return(<View style={[styles.container]}>
    {/* <TouchableOpacity onPress={()=>{props.navigation.openDrawer()}}>
        <Text style={[styles.text, { fontFamily : "Montserrat"}]}>toggle</Text>
    </TouchableOpacity> */}
    <Text style={[styles.text, { fontFamily : "Montserrat"}]}>
    وَجَدْتُ    
    {/* وجدت */}
    </Text>
    {/* <View style={{width:10 , height: 10}}></View> */}
</View>)
}

const styles = StyleSheet.create({
    container:{
        flex:0,
        flexDirection:"row",
        height:50,
        backgroundColor:"#056687",
        alignItems:"center",
        justifyContent:"space-around",
        elevation:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    text:{
        color: "#fff",
        fontSize:20
    }
});