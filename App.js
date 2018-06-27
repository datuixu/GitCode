/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Storage from 'react-native-storage';
import AppNavigator from './src/components/navigators/AppNavigator'

import TabNavigator from 'react-native-tab-navigator';
  // //在这里可以进行一些初始化配置
  // var storage = new Storage({
  //   // 最大容量，默认值1000条数据循环存储
  //   size: 1000,
  
  //   // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  //   // 如果不指定则数据只会保存在内存中，重启后即丢失
  //   storageBackend: AsyncStorage,
  
  //   // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  //   defaultExpires: null,
  
  //   // 读写时在内存中缓存数据。默认启用。
  //   enableCache: true,
  
  //   // 如果storage中没有相应数据，或数据已过期，
  //   // 则会调用相应的sync方法，无缝返回最新数据。
  //   // sync方法的具体说明会在后文提到
  //   // 你可以在构造函数这里就写好sync的方法
  //   // 或是写到另一个文件里，这里require引入
  //   // 或是在任何时候，直接对storage.sync进行赋值修改
  //   sync: require('./sync')  // 这个sync文件是要你自己写的
  // });
function App() {

  return AppNavigator;
}
module.exports = App();



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
