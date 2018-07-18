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
import BottomNavigation, {
    IconTab,
    ShiftingTab,
    Badge
} from 'react-native-material-bottom-navigation'
import { connect } from 'react-redux'
import * as actions from '../../actions/requestTrendingData'
import {I18n} from '../../language/i18n'
import Icon from '../common/Icon'
import PopularPage from './popular/PopularPage'
import {HomeNavigator,TrendingNavigator} from '../navigators/AppNavigator'

export const FLAG_TAB = {
    flag_homeTab: 'tb_home',
    flag_popularTab: 'tb_popular',
    flag_trendingTab: 'tb_trending',
    flag_dynamicTab: 'tb_dynamic'
    
}

export default class TabPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab:FLAG_TAB.flag_homeTab
        }
    }
    tabs = [
        {
          key: FLAG_TAB.flag_homeTab,
          icon: 'home',
          label: I18n.t('home.tab_name'),
          barColor: '#FFFFFF',
          pressColor: 'rgba(0, 0, 0, 0.1)'
        },
        {
          key: FLAG_TAB.flag_trendingTab,
          icon: 'trending',
          label: I18n.t('trending.tab_name'),
          barColor: '#FFFFFF',
          pressColor: 'rgba(0, 0, 0, 0.1)'
        },
        {
          key: FLAG_TAB.flag_popularTab,
          icon: 'hot',
          label: I18n.t('popular.tab_name'),
          barColor: '#FFFFFF',
          pressColor: 'rgba(0, 0, 0, 0.1)'
        },
        {
          key: FLAG_TAB.flag_dynamicTab,
          icon: 'search',
          label: 'Music',
          barColor: '#FFFFFF',
          pressColor: 'rgba(0, 0, 0, 0.1)'
        }
    ]
    renderContent = () => {
        switch (this.state.activeTab) {
        case FLAG_TAB.flag_homeTab:
          return <HomeNavigator />
    
        case FLAG_TAB.flag_trendingTab:
          return <TrendingNavigator />
    
        case FLAG_TAB.flag_popularTab:
          return <PopularPage {...this.props}/>

        case FLAG_TAB.flag_dynamicTab:
          return <View />
        default:
          return <View />
        }
      }
      renderTab = ({ tab, isActive }) => (
        <ShiftingTab
          isActive={isActive}
        //   showBadge={tab.key === 'tb_trending'}
        //   renderBadge={() => <Badge>2</Badge>}
          key={tab.key}
          label={tab.label}
          renderIcon={this.renderIcon(tab.icon)}
          useLayoutAnimation={true}
          labelStyle={{color:'#2196F3'}} //选中的label颜色
        />
      )
      renderIcon = icon => ({ isActive }) => (
        isActive ? <Icon size={24} color="#2196F3" name={icon} /> : <Icon size={24} color="#808394" name={icon} />
      )
      render() {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>{this.renderContent()}</View>
            <BottomNavigation
              activeTab={this.state.activeTab}
              onTabPress={newTab => this.setState({ activeTab: newTab.key })}
              renderTab={this.renderTab}
              tabs={this.tabs}
              useLayoutAnimation={true}
              style={{borderTopWidth:1,borderTopColor:'#d6dadd'}}
            />
          </View>
        )
      }
}