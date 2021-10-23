import React from 'react';
import {TouchableOpacity, ImageBackground , StyleSheet, Text, View , TextInput, SafeAreaView } from 'react-native';

export default function Icon(props) {
return(<SafeAreaView style={styles.container}>
      {/* <ImageBackground  source={require("../../assets/images/drawerbg.jpg")} resizeMode="cover" style={[styles.image , styles.container]}> */}
    <Text style={styles.text}>
        header
    </Text>
    {/* </ImageBackground> */}
</SafeAreaView>)
}

const styles = StyleSheet.create({
    container:{
        flex:0,
        height:50,
        // marginBottom:10,
        shadowColor:"black",
        backgroundColor:"#056687",
        alignItems:"center",
        justifyContent:"flex-end"
    },
    text:{
        paddingBottom:10

    },
    image:{
        flex:1,
        width : "100%"
      }
});