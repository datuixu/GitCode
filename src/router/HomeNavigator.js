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
import {withNavigation , createDrawerNavigator} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import CustomKeyPage from '../components/page/my/CustomKeyPage'
import SortKeyPage from '../components/page/my/SortKeyPage'
import CustomThemePage from '../components/page/my/CustomThemePage'
import HomePage from '../components/page/home/HomePage'
import PopularPage from '../components/page/popular/PopularPage'
import PopularDetailPage from '../components/page/popular/PopularDetailPage'
import TrendingPage from '../components/page/trending/TrendingPage'
import * as actions from '../actions/requestGlobalData'
import HomeDrawerItems from '../components/common/HomeDrawerItems'
import TrendingDrawerItems from '../components/common/TrendingDrawerItems'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'

const deviceWidth = Dimensions.get('window').width
console.log(this.props)
class HomeNavigator extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        console.log(this.props)
        const {navigation,theme} = this.props
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
                            style={{color: focused ? theme.selectedIconColor : '#808394'}}
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
                            style={{color: focused ? theme.selectedIconColor : '#808394'}}
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
                            style={{color: focused ? theme.selectedIconColor : '#808394'}}
                        />
                    )
                }
            }
          }, {
            initialRouteName: 'HomePage',
            shifting:true,
            activeTintColor: theme.selectedIconColor,
            animationEnabled:true,
            backBehavior:'none',
            barStyle: { 
                backgroundColor: '#FFFFFF',
                borderTopWidth:0.5,
                borderTopColor:'#d6dadd',
            }
        });
       const HomeNavigators = createDrawerNavigator({
            BottomTabNavigator: {
                screen: BottomTabNavigator
            },
            HomePage:{
              screen:HomePage
            },
            // CustomKeyPage: {
            //     screen: CustomKeyPage
            // },
            // SortKeyPage: {
            //     screen : SortKeyPage
            // },
            CustomThemePage:{
                screen:CustomThemePage
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
        return <HomeNavigators />
    }
}

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(HomeNavigator)
