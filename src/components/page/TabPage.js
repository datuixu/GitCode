/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {I18n} from '../../language/i18n';
import PopularPage from './popular/PopularPage';
// import PopularPage from './PopularPage'
// import TrendingPage from './TrendingPage'
// import FavoritePage from './FavoritePage'
// import MyPage from './my/MyPage'
// import Toast, {DURATION} from 'react-native-easy-toast'
// import BaseComponent from './BaseComponent'
// import SafeAreaViewPlus from '../common/SafeAreaViewPlus'

export default class TabPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_popular'}
                selectedTitleStyle={{color:'red'}}
                title={I18n.t('popular.tab_name')}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')}/>}
                renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_popular'})}>
                <PopularPage />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_trending'}
                title={I18n.t('trending.tab_name')}
                selectedTitleStyle={{color:'yellow'}}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')}/>}
                renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')}/>}
                onPress={() => this.setState({selectedTab: 'tb_trending'})}>
                <View style={{backgroundColor: 'yellow',flex:1}}></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_favorite'}
                  title={I18n.t('favorite.tab_name')}
                  selectedTitleStyle={{color:'green'}}
                  renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_favorite.png')}/>}
                  renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'green'}]} source={require('../../res/images/ic_favorite.png')}/>}
                  onPress={() => this.setState({selectedTab: 'tb_favorite'})}>
                <View style={{backgroundColor: 'green',flex:1}}></View>
              </TabNavigator.Item>
              <TabNavigator.Item
                  selected={this.state.selectedTab === 'tb_my'}
                  title={I18n.t('my.tab_name')}
                  selectedTitleStyle={{color:'blue'}}
                  renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_my.png')}/>}
                  renderSelectedIcon={() =><Image style={[styles.image,{tintColor:'blue'}]} source={require('../../res/images/ic_my.png')}/>}
                  onPress={() => this.setState({selectedTab: 'tb_my'})}>
                  <View style={{backgroundColor: 'blue',flex:1}}></View>
              </TabNavigator.Item>
            </TabNavigator>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});

