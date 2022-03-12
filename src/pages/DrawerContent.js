import React, { useState, useContext } from 'react';
import { ImageBackground , Image, StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import { Context as SettingsContext } from '../context/SettingsContext'
import { useFonts } from 'expo-font';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import Icon from "../components/Icon";

const locales = {
  // en: require("../locale/eng/translate.json"),
  tr: require("../locale/tr/translate.json"),
  ar: require("../locale/ar/translate.json"),
};
export default function App(props) {
  const { state: { locale } } = useContext(SettingsContext)
  const [loaded] = useFonts({
    Montserrat: require('../../assets/fonts/Amiri-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground  source={require("../../assets/images/drawerbg.jpg")} resizeMode="cover" style={styles.image}>
      <DrawerContentScrollView {...props}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image source={require("../../assets/splash.png")} style={styles.CoverImage} resizeMode="cover"></Image>
          </View>
        </View>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }}>
              <View style={styles.pages}>
                <Icon
                  type="home"
                  color={"white"}
                  size={"25"}
                />
                <Text style={[styles.pagesText , { fontFamily : "Montserrat"}]}>
                  {locales[locale].global.home}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate('Favorites') }}>
              <View style={styles.pages}>
                <Icon
                  type="star"
                  color={"white"}
                  size={"25"}
                />
                <Text style={[styles.pagesText , { fontFamily : "Montserrat"}]}>
                  {locales[locale].global.favs}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { props.navigation.navigate('Settings') }}>
              <View style={styles.pages}>
                <Icon
                  type="settings"
                  color={"white"}
                  size={"25"}
                />
                <Text style={[styles.pagesText , { fontFamily : "Montserrat"}]}>
                  {locales[locale].global.settings}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <Text style={[styles.pagesText , {fontSize:22 , fontFamily : "Montserrat"}]}> مَنْ طلَبَ شَیئاً وَ جَدَّ وَجَدَ.</Text>
    </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  pages: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal:20,
    marginVertical:0,
    justifyContent: "flex-start"
  },
  pagesText:{
    paddingHorizontal:15,
    fontSize:20,
    color:"white"
  },
  title: {
    fontSize: 16,
    color: "white",
    marginBottom: 3,
    fontSize:28,
    paddingHorizontal : 37,
    fontWeight: "normal",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    justifyContent:"center",
    alignItems:"center"
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  header: {
    padding: 40,
    alignContent:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  container:{
    flex : 1,
    backgroundColor:"green",
  },
  image:{
    flex:1,
    width : "100%"
  },
  CoverImage:{
    flex:1,
    width : "100%",
    height : 120,
  }
});
