import React, { useState , useEffect ,useCallback } from 'react';
import {TouchableOpacity, StyleSheet, Text, View , TextInput, SafeAreaView, ScrollView } from 'react-native';
// import { throttle } from 'lodash';
import { debounce } from "lodash";

import db from "../../assets/son.json";

const WordSearchPage = ({navigation}) => {
    const [kelime, setKelime] = useState("")
    const [translation, setTranslation] = useState([])
    const [notFound, setNotFound] = useState("")

    const myChangeHandler = useCallback(debounce((e)=>{getWordFromInput(e);}, 500), []);



    const getWordFromInput = (input) => {
        setTranslation([])
        console.log('====================================');
        console.log(input);
        console.log('====================================');
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        let response = []
        if (isArabic.test(input) === true) {
            response = input.length > 3  ? db.filter(i=> normalize_text(i.ar).includes(normalize_text(input)) ) : db.filter(i=> normalize_text(i.ar) == normalize_text(input) )
            if (response.length == 0) {
                    setTranslation([])
                    setNotFound("ar"); 
            }
            else {
                setNotFound("");
                const list = response.map( i => i.ar);
                const uniqueList = Array.from(new Set(list));
                const groups= uniqueList.map( c => { 
                            return  { word:c, goals:[]};
                        } ); 
                
                response.forEach( d => { 
                            groups.find( g => g.word == d.ar)?.goals.push(d.tr);
                });
                setTranslation(groups)
            }
        } else {
            let newReg = input.length > 3 ? new RegExp(input.toLocaleLowerCase('tr-TR'), 'g'): new RegExp(`(?:^|\W)${input.toLocaleLowerCase('tr-TR')}(?:$|\W)`, 'g')
            response = db.filter(i=> newReg.test(i.tr));
            if (response.length == 0) {
                    setTranslation([])
                    setNotFound("tr"); 
            }
            else {
                setNotFound("");
                const list = response.map( i => i.tr);
                const uniqueList = Array.from(new Set(list));
                const groups= uniqueList.map( c => { 
                            return  { word:c, goals:[]};
                        } ); 
                
                response.forEach( d => { 
                            groups.find( g => g.word == d.tr)?.goals.push(d.ar);
                });
                setTranslation(groups)
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

    const RenderAWord = ({element}) =>{
        return(
            <View style={styles.aWordContiner}>

            <Text style = {styles.aWordHeader}>
                    { element.word }
                </Text>
                <Text>
                { element.goals.join(', ') }
                        </Text>
            
            </View>
        )
    }

    const renderResult = () => {
        return (
            <ScrollView style={styles.listContainer} >
                {
                    // translation.length > 0 &&
                    translation?.map((i, index) => {
                        return (<RenderAWord key={index} element={i}/>)
                    })
                    }
            <View style={{ alignItems: 'center', }}>
            {
                    notFound === "tr" ?
                        <Text className="ws-header">
                            Bu kelime bulunamadı.
                    </Text> : notFound === "ar" ?
                            <Text className="ws-header">
                                لم يتم العثور على هذه الكلمة.
                    </Text> : null 
                }
            </View>
            </ScrollView>
        )
    }

    function throttle(func, timeFrame) {
        var lastTime = 0;
        function func () {
             console.log('asdf');
            var now = new Date();
            if (now - lastTime >= timeFrame) {
                func();
                lastTime = now;
            }
        };
        return func
      }


    return (
        <SafeAreaView style={styles.container} >
            <TextInput style={[{  textAlign: checkArabic(kelime) === "tr" ? "left" : "right"} , styles.textInput] }
                value={kelime}
                onChangeText={(val) => {
                    setKelime(val)
                    myChangeHandler(val)
                }}>
                </TextInput>
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
    aWordContiner:{
        backgroundColor: '#2596be',
        justifyContent: 'flex-start',
        padding : 10,
        margin: 5,
        borderRadius : 5,
        display:'flex',
        alignItems : 'stretch',
        // flexDirection : 'row',
        // flex : 1
    },
    aWordHeader:{
        fontSize: 25,
        alignSelf : 'flex-start',
        paddingHorizontal: 5,
        textTransform: 'capitalize'
    },
    listContainer:{
        alignSelf: 'stretch'
    }
  });

export default WordSearchPage;