import React , {useContext} from 'react';
import Search from "./src/pages/Search";
import Settings from "./src/pages/Settings";
import DrawerContent from "./src/pages/DrawerContent";
import Favorites from "./src/pages/Favorites";
import { Provider as SettingsProvider } from './src/context/SettingsContext'
import { Context as SettingsContext } from "./src/context/SettingsContext";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer , useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
import { useFonts } from 'expo-font';
import Icon from "./src/components/Icon";
import { TouchableOpacity } from 'react-native-gesture-handler';

const locales = {
  tr: require("./src/locale/tr/translate.json"),
  ar: require("./src/locale/ar/translate.json"),
};

export default function App(props) {
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Amiri-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <SettingsProvider>
      <NavigationContainer>
      {/* <Header {...props}/> */}
        <MyDrawer {...props} />
      </NavigationContainer>
    </SettingsProvider>
    </SafeAreaView>
  );
}

const LogoTitle = ({title}) =>{
  return(
    <View>
      <Text style={{color : '#fff' , marginBottom: 5, fontSize:25 , fontFamily: 'Montserrat'}}>
      {title ?? 'وجدت'}
      </Text>
    </View>
  )
} 

const LeftButton = () =>{
  const navigation = useNavigation();
  return(
    <TouchableOpacity
      style={{marginHorizontal: 5}}
    onPress={()=>{ navigation.toggleDrawer();}}>
      <Icon
          type="menu"
          color={"white"}
          size={"37"}
        />
    </TouchableOpacity>
  )
} 

function MyDrawer(props) {
  const { state : {locale}} = useContext(SettingsContext)

  return (
    <Drawer.Navigator screenOptions={{
      headerShown: true
    }} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Search" component={Search}         
      options={{
        headerTitle: (props) => <LogoTitle/>,
        headerLeft : () => <LeftButton/>,
        headerStyle: {
          backgroundColor: "#056687" 
        },
        headerTintColor: '#dbdbdb',
        headerTitleAlign: 'center'
      }} />
      <Drawer.Screen name="Settings" component={Settings}         
      options={{
          headerLeft : (props) => <LeftButton/>,
          headerTitle: () => <LogoTitle title={locales[locale].global.settings}/>,
          headerStyle: {
            backgroundColor: "#056687" 
          },
          headerTintColor: '#dbdbdb',
          headerTitleAlign: 'center'
        }}/>
      <Drawer.Screen name="Favorites" component={Favorites}
      options={{
        headerLeft : (props) => <LeftButton/>,
        headerTitle: () => <LogoTitle title={locales[locale].global.favs}/>,
        headerStyle: {
          backgroundColor: "#056687" 
        },
        headerTintColor: '#dbdbdb',
        headerTitleAlign: 'center'
      }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
