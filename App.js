/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'
import { store } from './src/store/index'
import {AppNavigator} from './src/components/navigators/AppNavigator'

export default class App extends Component {
   render(){
     return(
      <Provider store={store}>
        <AppNavigator />
      </Provider>
     )
   }
}
// function App() {
//   return(
//     <Provider store={store}>
//         <AppNavigator />
//     </Provider>
//   )
// }
// module.exports = App()

// export default AppNavigator;

// type Props = {};
// export default class App extends Component<Props> {
//   constructor(props) {
//     super(props);
//     this.state = {
//         selectedTab: 'tb_popular',
//     }
//   }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <TabNavigator>
  //         <TabNavigator.Item
  //           selected={this.state.selectedTab === 'tb_popular'}
  //           selectedTitleStyle={{color:'red'}}
  //           title={I18n.t('home.tab_name')}
  //           renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')}/>}
  //           renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')}/>}
  //           onPress={() => this.setState({selectedTab: 'tb_popular'})}>
  //           <View style={{backgroundColor: 'red',flex:1}}></View>
  //         </TabNavigator.Item>
  //         <TabNavigator.Item
  //           selected={this.state.selectedTab === 'tb_trending'}
  //           title={I18n.t('trending.tab_name')}
  //           selectedTitleStyle={{color:'yellow'}}
  //           renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')}/>}
  //           renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')}/>}
  //           onPress={() => this.setState({selectedTab: 'tb_trending'})}>
  //           <View style={{backgroundColor: 'yellow',flex:1}}></View>
  //         </TabNavigator.Item>
  //         <TabNavigator.Item
  //             selected={this.state.selectedTab === 'tb_favorite'}
  //             title={I18n.t('favorite.tab_name')}
  //             selectedTitleStyle={{color:'green'}}
  //             renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_favorite.png')}/>}
  //             renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'green'}]} source={require('./res/images/ic_favorite.png')}/>}
  //             onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
  //           <View style={{backgroundColor: 'green',flex:1}}></View>
  //         </TabNavigator.Item>
  //         <TabNavigator.Item
  //             selected={this.state.selectedTab === 'tb_my'}
  //             title={I18n.t('my.tab_name')}
  //             selectedTitleStyle={{color:'blue'}}
  //             renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_my.png')}/>}
  //             renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'blue'}]} source={require('./res/images/ic_my.png')}/>}
  //             onPress={() => this.setState({selectedTab: 'tb_my'})}>
  //             <View style={{backgroundColor: 'blue',flex:1}}></View>
  //         </TabNavigator.Item>
  //       </TabNavigator>
  //     </View>
  //   );
  // }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     height: 22,
//     width: 22,
//   }
// });
