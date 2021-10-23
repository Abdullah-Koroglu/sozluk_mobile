import React , {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import Icon from "../components/Icon";
const locales = {
  en: require("../locale/ar/translate.json"),
  tr: require("../locale/tr/translate.json"),
  ar: require("../locale/ar/translate.json"),
};

export default function App(props) {
  const lang =   "tr"
  const [locale] = useState(locales[lang])
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.section}>
          <View style={styles.header}>
          <Text style={styles.title}>Bismikallah</Text>
          </View>
        </View>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type="home"
                  color={color}
                  size={size}
                />
              )}
              label={locale.global.home}
              onPress={() => { props.navigation.navigate('Search') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type="star"
                  color={color}
                  size={size}
                />
              )}
              label="Favorites"
              onPress={() => { props.navigation.navigate('Favorites') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type="settings"
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              onPress={() => { props.navigation.navigate('Settings') }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
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
  title: {
    fontSize: 16,
    color:"white",
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
    backgroundColor: "purple"
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
  header:{
    padding:40
    },
});
