import React , {useContext , useState} from 'react';
import { StyleSheet, TouchableOpacity,  Text, View } from 'react-native';
import { Context as SettingsContext } from '../context/SettingsContext'
import Setting from "../components/SettingComponent";

const locales = {
  // en: require("../locale/eng/translate.json"),
  tr: require("../locale/tr/translate.json"),
  ar: require("../locale/ar/translate.json"),
};

export default function App() {
  const { state : {locale} ,setLocale} = useContext(SettingsContext)
  // const [modalVisible, setModalVisible] = useState(false);
  const settingsOptions = [
    {title: locales[locale].global.language, subTitle: locales[locale].localeName, onPress: () => {setLocale(locale == "tr" ? "ar" : "tr")}},
    {title: locales[locale].global.theme, subTitle: locales[locale].global.on_premium, onPress: () => {}}
  ];

  // const prefArr = [
  //   {
  //     name: 'عربية',
  //     selected: locale == 'ar',

  //     onPress: () => {
  //       setLocale('ar')
  //       setModalVisible(false);
  //     },
  //   },
  //   {
  //     name: 'Türkçe',
  //     selected: locale == 'tr',
  //     onPress: () => {
  //       setLocale('tr')
  //       setModalVisible(false);
  //     },
  //   },
  // ];

  return (
    <View>
      <Setting
            // modalVisible={modalVisible}
            // setModalVisible={setModalVisible}
            settingsOptions={settingsOptions}
            // prefArr={prefArr}
      />
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


{/* <TouchableOpacity onPress={()=>{
  setLocale(locale == "tr" ? "ar" : "tr")
}}> 
  <Text>
      {locales[locale].global.settings} - {locale}
  </Text>
</TouchableOpacity> */}