import React , {useContext , useState} from 'react';
import { StyleSheet, TouchableOpacity,  Text, View } from 'react-native';
import { Context as SettingsContext } from '../context/SettingsContext'

const locales = {
  // en: require("../locale/eng/translate.json"),
  tr: require("../locale/tr/translate.json"),
  ar: require("../locale/ar/translate.json"),
};

export default function App() {
  const { state : {locale} ,setLocale} = useContext(SettingsContext)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        setLocale(locale == "tr" ? "ar" : "tr")
      }}> 
        <Text>
            {locales[locale].global.settings} - {locale}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
