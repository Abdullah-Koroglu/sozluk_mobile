import React, { useState , useEffect ,useCallback } from 'react';
import {TouchableOpacity, StyleSheet, Text, View , TextInput, SafeAreaView, ScrollView } from 'react-native';
import { debounce } from "lodash";
import AsyncStorage from '@react-native-async-storage/async-storage';


import db from "../../assets/son.json";
import Icon from '../components/Icon';

const WordSearchPage = ({navigation}) => {
    const [kelime, setKelime] = useState("")
    const [translation, setTranslation] = useState([])
    const [notFound, setNotFound] = useState("")

    const myChangeHandler = useCallback(debounce((e)=>{getWordFromInput(e);}, 500), []);



    const getWordFromInput = (input) => {
        if (input) {
            
        setTranslation([])
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
                getWordToHeadAr(groups, input)
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
                getWordToHeadTr(groups,input.toLocaleLowerCase('tr-TR'))
            }
        }
    
        }else{
            setTranslation([])
            setNotFound('')
        }
    }

    const getWordToHeadTr = (list, word) =>{
        let matches = list.filter(i => i.word.toLocaleLowerCase('tr-TR') === word)
        let noMatches = list.filter(i => i.word.toLocaleLowerCase('tr-TR') !== word)
        setTranslation([...matches, ...noMatches])
    }
    
    const getWordToHeadAr = (list, word) =>{
        let matches = list.filter(i=> normalize_text(i.ar) === normalize_text(input))
        let noMatches = list.filter(i => i=> normalize_text(i.ar) !== normalize_text(input))
        setTranslation([...matches, ...noMatches])
    }

    const checkArabic = (input) => {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(input) === true) {
            return "ar"
        } else {
            return "tr"
        }
    }

    const setFavorite = async (listItem) =>{
        await AsyncStorage.setItem('@storage_Key', {...listItem, date: new Date()})
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

              <View style={{flex : 1, marginEnd : 10}}>
              <Text style={styles.aWordHeader}>
                    {element.word}
                </Text>
                <Text style={styles.aWordGoal}>
                    {element.goals.join(', ')}
                </Text>
              </View>
                <Icon
                    type="star"
                    color={'#d9d9d9'}
                    // color={"#ffdf00"}
                    size={"25"}
                />
            </View>
        )
    }

    const renderResult = () => {
        //TODO ARANAN KELME ILK GETIRILECEK
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
        backgroundColor: '#f2f3f5',
        justifyContent: 'flex-start',
        padding : 10,
        margin: 5,
        borderRadius : 5,
        display:'flex',
        alignItems : 'stretch',
        borderBottomWidth:1,
        borderColor: '#dbdbdb',
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: "space-between"
        // flex : 1
    },
    aWordHeader:{
        fontSize: 25,
        alignSelf : 'flex-start',
        // paddingHorizontal: 5,
        textTransform: 'capitalize'
    },
    aWordGoal:{
        fontSize:23
    },
    listContainer:{
        alignSelf: 'stretch'
    }
  });

export default WordSearchPage;