import React, { useState , useEffect } from 'react';
import {TouchableOpacity, StyleSheet, Text, View , TextInput, SafeAreaView } from 'react-native';

import db from "../../assets/son.json";

const WordSearchPage = () => {
    const [kelime, setKelime] = useState("")
    const [translation, setTranslation] = useState("")
    const [notFound, setNotFound] = useState("")


    const getWordFromInput = (input) => {
        debugger
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        let response = []
        if (isArabic.test(input) === true) {
            response = db.filter(i=> i.ar == input );
            // console.log(response);
            if (response.length == 0) {
                    setTranslation([])
                    setNotFound("ar"); 
            }
            else {
                setNotFound("");
                setTranslation(response)
            }
        } else {
            response = db.filter(i=> i.tr == input.toLocaleLowerCase('tr-TR') );
            if (response.length == 0) {
                    setTranslation([])
                    setNotFound("tr"); 
            }
            else {
                setNotFound("");
                setTranslation(response)
            }
        }
    }

    const checkArabic = (input) => {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(input) === true) {
            return "ar"
        } else {
            return "tr"
        }
    }

    const normalize_text = function (text) {

        //remove special characters
        text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '');

        //normalize Arabic
        text = text.replace(/(آ|إ|أ)/g, 'ا');
        text = text.replace(/(ة)/g, 'ه');
        text = text.replace(/(ئ|ؤ)/g, 'ء')
        text = text.replace(/(ى)/g, 'ي');

        //convert arabic numerals to english counterparts.
        var starter = 0x660;
        for (var i = 0; i < 10; i++) {
            text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
        }

        return text;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const renderResult = () => {
        return (
            <View>
                {
                    translation.length > 0 &&
                    translation.map((i, index) => {
                        return (<Text key={index}> {i.ar} - {i.tr}</Text>)
                    })
                    }
                {
                    notFound === "tr" ?
                        <Text className="ws-header">
                            Bu kelime bulunamadı
                    </Text> : notFound === "ar" ?
                            <Text className="ws-header">
                                لم يتم العثور على هذه الكلمة
                    </Text> : null 
                    // <Text> {translation?.KelimeAr} - {translation?.KelimeTr} - {translation?.AnlamTr}</Text>
                }
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container} >
            <TextInput style={[{  textAlign: checkArabic(kelime) === "tr" ? "left" : "right"} , styles.textInput] }
                value={kelime}
                onChangeText={(val) => {
                    setKelime(val)
                    debounce(function() {
                        console.log('naber');
                        getWordFromInput(val)
                    }, 3000);
                    }}>
                </TextInput>
            {/* <TouchableOpacity onPress={()=>{getWordFromInput(kelime);}}> 
            <View 
                style={styles.button}
                ><Text style={{color:"#fff"}}>Ara</Text></View>
            </TouchableOpacity> */}
            {renderResult()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height:"100%",
      width:"100%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    },row:{
        // flex: 1,
        display:"flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    textInput : {
        borderColor : "#ddd",
        color:"#444",
        borderWidth:1,
        height:40,
        padding:10,
        borderRadius:10,
        width:"90%",
        margin:30,
    },
    button:{
        width:50,
        height:30,
        borderRadius:10,
        margin:10,
        textShadowColor:"red",
        backgroundColor:"blue",
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

export default WordSearchPage;