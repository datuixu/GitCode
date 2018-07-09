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
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import {I18n} from '../../language/i18n'
import PopularPage from './popular/PopularPage'
import TrendingPage from './trending/TrendingPage'
import MyPage from './my/MyPage'
import HomePage from './home/HomePage'
import {DrawerNav} from '../navigators/AppNavigator'

export const FLAG_TAB = {
    flag_homeTab: 'tb_home',
    flag_popularTab: 'tb_popular',
    flag_trendingTab: 'tb_trending',
    flag_favoriteTab: 'tb_favorite'
    
}
export default class TabPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_home',
        }
    }
    _renderTab(Component, selectedTab, title, renderIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={{color:'#2196F3'}}
                title={title}
                renderIcon={() => <Image style={styles.image}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor:'#2196F3'}]}
                                                 source={renderIcon}/>}
                onPress={() => this.onTabClick(this.state.selectedTab, selectedTab)}
            >
                <Component {...this.props}/>
            </TabNavigator.Item>
        )
    }
    onTabClick(from, to) {
        this.setState({selectedTab: to})
        // DeviceEventEmitter.emit(EVENT_TYPE_HOME_TAB_SELECT, from, to)
    }
    render() {
        return (
          <View style={styles.container}>
            <TabNavigator>
                {this._renderTab(DrawerNav, FLAG_TAB.flag_homeTab, I18n.t('popular.tab_name'), require('../../res/images/ic_polular.png'))}
                {this._renderTab(PopularPage, FLAG_TAB.flag_popularTab, I18n.t('popular.tab_name'), require('../../res/images/ic_polular.png'))}
                {this._renderTab(TrendingPage, FLAG_TAB.flag_trendingTab, I18n.t('trending.tab_name'), require('../../res/images/ic_trending.png'))}
                {this._renderTab(FavoritePage, FLAG_TAB.flag_favoriteTab, I18n.t('favorite.tab_name'), require('../../res/images/ic_favorite.png'))}
            </TabNavigator>
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 26,
        width: 26,
    }
});

