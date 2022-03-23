import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function App(props) {
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const getFavorites = async ()=>{
    const keys = await AsyncStorage.getAllKeys();
    let  items = await AsyncStorage.multiGet(keys)
    items = items.filter((i)=>i[0].startsWith('@w_'))
    setFavorites(items)
    setLoading(false)
  }

  const RenderAWord = ({element}) =>{
    const value = JSON.parse(element[1])
    return(
        <View style={styles.aWordContiner}>

          <View style={{flex : 1, marginEnd : 10}}>
          <Text style={styles.aWordHeader}>
                {value.word}
            </Text>
            <Text style={styles.aWordGoal}>
                {value.goals.join(', ')}
            </Text>
          </View>
        </View>
    )
}

  const renderResult = () => {
    return (
        <ScrollView style={styles.listContainer} >
            {
                favorites?.map((i, index) => {
                    return (<RenderAWord key={index} element={i}/>)
                })
                }
        </ScrollView>
    )
}

  useEffect(()=>{
    getFavorites();
  },[props, isFocused])

  return (
    <View>
        {loading ? <Text>loading</Text> : 
        
        <View>
            {renderResult()}
        </View>
        
        }
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
