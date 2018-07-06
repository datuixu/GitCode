import React from 'react'
import {
    Dimensions
} from 'react-native'
import {StackNavigator,DrawerNavigator} from 'react-navigation'
import DrawerItems from '../common/DrawerItems'
import WelcomePage from '../page/WelcomePage'
import TabPage from '../page/TabPage'
import HomePage from '../page/home/HomePage'
import LoginPage from '../page/login/LoginPage'
import CustomKeyPage from '../page/my/CustomKeyPage'
import MyPage from '../page/my/MyPage'

const deviceWidth = Dimensions.get('window').width
export default AppNavigator = StackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    LoginPage: {
        screen: LoginPage
    },
    TabPage: {
        screen: TabPage
    },
    HomePage: {
        screen: HomePage
    },
}, {
    navigationOptions: {
        header: null
    }
})

export const DrawerNav = DrawerNavigator({
    HomePage: {
        screen: HomePage
    },
    CustomKeyPage: {
        screen: CustomKeyPage
    }
},{
    drawerWidth: deviceWidth-150, // 抽屉宽
    drawerPosition: 'left', // 抽屉在左边还是右边
    contentOptions: {
    //   initialRouteName: 'MyPage', // 默认页面组件
      labelStyle : {//标签样式
           // color : 'red',
           height : 30,
      },
      activeTintColor: 'white',  // 选中文字颜色
      activeBackgroundColor: '#ff8500', // 选中背景颜色
      inactiveTintColor: '#666',  // 未选中文字颜色
      inactiveBackgroundColor: '#fff', // 未选中背景颜色
      style: {  // 样式
         marginVertical: 0, 
      },
   },
   contentComponent: props => {
        return (
            <DrawerItems {...props}/>
        )
    },
})
