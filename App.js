import React from 'react';
import Search from "./src/pages/Search";
import Header from "./src/components/Header";
import Settings from "./src/pages/Settings";
import DrawerContent from "./src/pages/DrawerContent";
import Favorites from "./src/pages/Favorites";
import { Provider as SettingsProvider } from './src/context/SettingsContext'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
import { useFonts } from 'expo-font';

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

const LogoTitle = () =>{
  return(
    <View>
      <Text style={{color : '#fff' , marginBottom: 5, fontSize:25 , fontFamily: 'Montserrat'}}>
      وجد
      </Text>
    </View>
  )
} 

function MyDrawer(props) {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: true
    }} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Search" component={Search}         
      options={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#056687" 
        },
        headerTintColor: '#dbdbdb',
        headerTitleAlign: 'center'
      }} />
      <Drawer.Screen name="Settings" component={Settings}         
      options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#056687" 
          },
          headerTintColor: '#dbdbdb',
          headerTitleAlign: 'center'
        }}/>
      <Drawer.Screen name="Favorites" component={Favorites} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
