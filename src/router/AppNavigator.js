import React, {Component} from 'react'
import {
    Dimensions
} from 'react-native'
// import {
//     reduxifyNavigator,
//     createReactNavigationReduxMiddleware
// } from 'react-navigation-redux-helpers'
import {
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation'
// import { connect } from 'react-redux'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// import BottomTabNavigator from './BottomTabNavigator'
import WelcomeScreen from '../components/page/WelcomeScreen'
import PopularDetailPage from '../components/page/hot/PopularDetailPage'
import HotScreen from '../components/page/hot/HotScreen'
import TrendingScreen from '../components/page/trending/TrendingScreen'
import HomeScreen from '../components/page/home/HomeScreen'
import HomeDrawerItems from '../components/common/HomeDrawerItems'
import TrendingDrawerItems from '../components/common/TrendingDrawerItems'
import LoginScreen from '../components/page/login/LoginScreen'
import CustomTheme from '../components/page/my/CustomTheme'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'

const deviceWidth = Dimensions.get('window').width

// const middleware = createReactNavigationReduxMiddleware(
//     'root',
//     state => state.nav
// )

const TrendingNavigator = createDrawerNavigator({
    TrendingScreen:{
        screen:TrendingScreen
    }
},{
    initialRouteName:'TrendingScreen',
    drawerWidth: deviceWidth-200, // 抽屉宽
    drawerPosition: 'right', // 抽屉在左边还是右边
    contentComponent: props => {
        return (
            <TrendingDrawerItems {...props}/>
        )
    },
})

const BottomTabNavigator = createMaterialBottomTabNavigator({
    HomeScreen: { 
        screen: HomeScreen,
    },
    TrendingNavigator: { 
        screen: TrendingNavigator,
        navigationOptions:TrendingScreen.navigationOptions //解决找不到TrendingScreen的navigationOptions配置问题
    },
    HotScreen: { 
        screen: HotScreen
    }
  }, {
    initialRouteName: 'HomeScreen',
    shifting:true,
    // activeTintColor: '#2196F3',
    animationEnabled:true,
    backBehavior:'none',
    // barStyle: { 
    //     backgroundColor: '#FFFFFF',
    //     borderTopWidth:0.5,
    //     borderTopColor:'#d6dadd',
    // }
});
const HomeNavigator = createDrawerNavigator({
    BottomTabNavigator: {
        screen: BottomTabNavigator
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

export const AppNavigator = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen
    },
    LoginScreen: {
        screen: LoginScreen
    },
    TrendingNavigator:{
        screen:TrendingNavigator
    },
    HomeNavigator: {
        screen: HomeNavigator
    },
    HomeScreen:{
        screen:HomeScreen
    },
    TrendingScreen:{
        screen:TrendingScreen
    },
    HotScreen:{
        screen:HotScreen
    },
    CustomTheme:{
        screen:CustomTheme
    },
    PopularDetailPage:{
        screen:PopularDetailPage
    },
}, {
    navigationOptions: {
        header: null
    }
})

// const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

// const mapStateToProps = state => ({
//     state: state.nav
// })

// const AppNavigator = connect(mapStateToProps)(AppWithNavigationState)

// export { RootNavigator, AppNavigator, middleware }



