import React, { useState, useContext } from 'react';
import { ImageBackground , Image, StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import { Context as SettingsContext } from '../context/SettingsContext'
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
  return (
    <View style={styles.container}>
      <ImageBackground  source={require("../../assets/images/drawerbg.jpg")} resizeMode="cover" style={styles.image}>
      <DrawerContentScrollView {...props}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Image source={require("../../assets/favicon.png")}></Image>
            <Text style={styles.title}>Bismikallah</Text>
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
                <Text style={styles.pagesText}>
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
                <Text style={styles.pagesText}>
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
                <Text style={styles.pagesText}>
                  {locales[locale].global.settings}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      </ImageBackground>
      {/* <View style={styles.bottomDrawerSection}>
        <DrawerItem 
            // icon={({color, size}) => (
            //     <Icon 
            //     name="exit-to-app" 
            //     color={color}
            //     size={size}
            //     />
            // )}
            label="Sign Out"
            onPress={() => {signOut()}}
        />
    </View> */}
    </View>
  );
}


const styles = StyleSheet.create({
  pages: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal:20,
    marginVertical:4,
    justifyContent: "flex-start"
  },
  pagesText:{
    paddingHorizontal:15,
    color:"white"
  },
  title: {
    fontSize: 16,
    color: "white",
    marginTop: 3,
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
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
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
    backgroundColor:"green"
  },
  image:{
    flex:1,
    width : "100%"
  }
});
