import React from 'react'
import {
    Dimensions
} from 'react-native'
import {createStackNavigator,createDrawerNavigator} from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'
import HomeDrawerItems from '../components/common/HomeDrawerItems'
import TrendingDrawerItems from '../components/common/TrendingDrawerItems'
import WelcomePage from '../components/page/WelcomePage'
import PopularPage from '../components/page/popular/PopularPage'
import HomePage from '../components/page/home/HomePage'
import LoginPage from '../components/page/login/LoginPage'
import CustomKeyPage from '../components/page/my/CustomKeyPage'
import CustomThemePage from '../components/page/my/CustomThemePage'
import SortKeyPage from '../components/page/my/SortKeyPage'
import TrendingPage from '../components/page/trending/TrendingPage'
import PopularDetailPage from '../components/page/popular/PopularDetailPage'

const deviceWidth = Dimensions.get('window').width

export const TrendingNavigator = createDrawerNavigator({
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

export const BottomTabNavigator = createMaterialBottomTabNavigator({
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
    barStyle: { 
        backgroundColor: '#FFFFFF',
        borderTopWidth:0.5,
        borderTopColor:'#d6dadd',
    }
  });

export const HomeNavigator = createDrawerNavigator({
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
    drawerWidth: deviceWidth-150, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentComponent: props => {
        return (
            <HomeDrawerItems {...props}/>
        )
    },
})

export const AppNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    LoginPage: {
        screen: LoginPage
    },
    HomeNavigator: {
        screen: HomeNavigator
    },
    PopularPage:{
        screen:PopularPage
    },
    PopularDetailPage: {
        screen: PopularDetailPage
    },
    CustomThemePage: {
        screen: CustomThemePage
    }
}, {
    navigationOptions: {
        header: null
    }
})



