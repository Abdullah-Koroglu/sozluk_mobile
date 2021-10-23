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

export default function App(props) {
  return (
    <SafeAreaView style={{flex:1}}>
    <SettingsProvider>
      <NavigationContainer>
      <Header></Header>
        <MyDrawer {...props} />
      </NavigationContainer>
    </SettingsProvider>
    </SafeAreaView>
  );
}

function MyDrawer(props) {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false
    }} drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Search" component={Search} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Favorites" component={Favorites} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
