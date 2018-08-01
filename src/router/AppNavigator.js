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
import WelcomePage from '../components/page/WelcomePage'
import PopularDetailPage from '../components/page/popular/PopularDetailPage'
import PopularPage from '../components/page/popular/PopularPage'
import TrendingPage from '../components/page/trending/TrendingPage'
import HomePage from '../components/page/home/HomePage'
import HomeDrawerItems from '../components/common/HomeDrawerItems'
import TrendingDrawerItems from '../components/common/TrendingDrawerItems'
import LoginPage from '../components/page/login/LoginPage'
import CustomThemePage from '../components/page/my/CustomThemePage'
import {I18n} from '../language/i18n'
import Icon from '../components/common/Icon'

const deviceWidth = Dimensions.get('window').width

// const middleware = createReactNavigationReduxMiddleware(
//     'root',
//     state => state.nav
// )

const TrendingNavigator = createDrawerNavigator({
    TrendingPage:{
        screen:TrendingPage
    }
},{
    initialRouteName:'TrendingPage',
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
    },
    TrendingNavigator: { 
        screen: TrendingNavigator,
        navigationOptions:TrendingPage.navigationOptions //解决找不到TrendingPage的navigationOptions配置问题
    },
    PopularPage: { 
        screen: PopularPage
    }
  }, {
    initialRouteName: 'HomePage',
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
    WelcomePage: {
        screen: WelcomePage
    },
    LoginPage: {
        screen: LoginPage
    },
    TrendingNavigator:{
        screen:TrendingNavigator
    },
    HomeNavigator: {
        screen: HomeNavigator
    },
    HomePage:{
        screen:HomePage
    },
    TrendingPage:{
        screen:TrendingPage
    },
    PopularPage:{
        screen:PopularPage
    },
    CustomThemePage:{
        screen:CustomThemePage
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



