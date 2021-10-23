import React from 'react';
import Search from "./src/pages/Search";
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
    <SettingsProvider>
      <NavigationContainer>
        <MyDrawer {...props} />
      </NavigationContainer>
    </SettingsProvider>
  );
}

function MyDrawer(props) {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
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
