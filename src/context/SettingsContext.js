import createDataContext from './createDataContext'
// import { AsyncStorage } from 'react-native';
const settingReducer = (state,action) =>{
    switch (action.type) {
        case 'set_locale':
            // _storeLocale(action.payload)
            return {...state , locale: action.payload }
        default:
            return state;
    }
}

setLocale = (dispatch) =>(lang)  =>{
        dispatch({type:'set_locale' , payload : lang})
}

const _storeLocale = async (lang) => {
    try {
      await AsyncStorage.setItem(
        '@locale',
        lang
      );
    } catch (error) {
      // Error saving data
    }
  };

const _retrieveLocale = async () => {
    try {
      const value = await AsyncStorage.getItem('@locale');
      if (value !== null) {
          setLocale("value")
        }else{    
          setLocale("tr")
        _storeLocale("tr")
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _retrieveLocale()


export const { Provider , Context} = createDataContext(
    settingReducer,
    { setLocale },
    { locale : "tr" , theme : 'p'}
)