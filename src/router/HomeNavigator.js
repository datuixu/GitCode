/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'

import { connect } from 'react-redux'
import {createDrawerNavigator} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CustomKeyPage from '../components/page/my/CustomKeyPage'
import SortKeyPage from '../components/page/my/SortKeyPage'
import HomePage from '../components/page/home/HomePage'
import PopularPage from '../components/page/popular/PopularPage'
import TrendingPage from '../components/page/trending/TrendingPage'
import * as actions from '../actions/requestGlobalData'
import HomeDrawerItems from '../components/common/HomeDrawerItems'
import TrendingDrawerItems from '../components/common/TrendingDrawerItems'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'

const deviceWidth = Dimensions.get('window').width

class HomeNavigator extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        console.log(this.props)
        const TrendingNavigator = createDrawerNavigator({
            TrendingPage: {
                screen: TrendingPage
            }
        },{
            drawerWidth: deviceWidth-200, // 抽屉宽
            drawerPosition: 'right', // 抽屉在左边还是右边
            contentComponent: props => {
                return (
                    <TrendingDrawerItems {...props}/>
                )
            },
        })
        const BottomTabNavigator = createMaterialBottomTabNavigator({
            HomePage: { 
                screen: HomePage,
                navigationOptions: {
                    tabBarLabel: I18n.t('home.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='home'
                            size={24}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            },
            TrendingNavigator: { 
                screen: TrendingNavigator,
                navigationOptions: {
                    tabBarLabel: I18n.t('trending.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='trending'
                            size={20}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            },
            PopularPage: { 
                screen: PopularPage,
                navigationOptions: {
                    tabBarLabel: I18n.t('popular.tab_name'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Icon
                            name='hot'
                            size={24}
                            style={{color: focused ? '#2196F3' : '#808394'}}
                        />
                    )
                }
            }
          }, {
            initialRouteName: 'HomePage',
            shifting:true,
            activeTintColor: '#2196F3',
            animationEnabled:true,
            backBehavior:'none',
            barStyle: { 
                backgroundColor: '#FFFFFF',
                borderTopWidth:0.5,
                borderTopColor:'#d6dadd',
            }
        });
       const HomeNavigator = createDrawerNavigator({
            BottomTabNavigator: {
                screen: BottomTabNavigator
            },
            CustomKeyPage: {
                screen: CustomKeyPage
            },
            SortKeyPage: {
                screen : SortKeyPage
            }
        },{
            backBehavior:'none',
            drawerWidth: deviceWidth-150, // 抽屉宽
            drawerPosition: 'left', // 抽屉在左边还是右边
            contentComponent: props => {
                return (
                    <HomeDrawerItems {...props}/>
                )
            },
        })
        return <HomeNavigator />
    }
}

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(HomeNavigator)
