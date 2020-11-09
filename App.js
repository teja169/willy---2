import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation'; 
import { createBottomTabNavigator} from ' react-navigation-tabs'

import BookTransactinScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  render(){
  return (
     <AppContainer />
  );
}
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: BookTransactionScreen},
  Search: {screen: SearchScreen},
},

{
  defaultNavigatinOptions: ({navigation}) =>({
    tabBarIcon : ()=>{
      const routeName = naviagtion.state.routeName;
      console.log(routeName)
        if(routeName === "Transaction"){
          return(
            <Image
            source={require("./assets/book.png")}
            style={{width:40 , heigth : 40}}
            />
          )

        }
        else if(routeName === "Search"){
          return(
            <Image
            source={require("./assets/searchingbook.png")}
            style={{width:40 , heigth : 40}}
            />
          )
        }
      }
    })
  }
  );



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
