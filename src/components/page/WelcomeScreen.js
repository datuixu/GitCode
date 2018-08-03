/**
 * Created on 2018/6/26.
 * 
 *  @author wangjiahuan
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import {StackActions,NavigationActions} from 'react-navigation'
import ThemeDao from '../expand/dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import * as actions from '../../actions/requestGlobalData'
import {ThemeFactory} from '../../res/styles/ThemeFactory'
import I18nDao from '../expand/dao/I18nDao'
import LoginDao from '../expand/dao/LoginDao'
import UserInfoDao from '../expand/dao/UserInfoDao'

class WelcomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() { // 初始化主题和语言配置
        new ThemeDao().getTheme().then((key) => {
            this.props.dispatch(actions.updateThemeFactory(ThemeFactory[key]))
        })
        new I18nDao().getI18n().then((lan) => {
            this.props.dispatch(actions.updateLocale(lan))
        })

        const resetLogin = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "LoginScreen"
                })
            ]
        })

        const resetHome = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "HomeNavigator"
                })
            ]
        })
        
        this.timer = setTimeout(() => {
            new LoginDao().getToken().then((token) => {
                console.log(token)
                if(token === ""){
                    SplashScreen.hide(); //关闭启动屏幕
                    this.props.navigation.dispatch(resetLogin)
                }else{
                    new UserInfoDao().getUserInfo(token).then((user) => {
                        // if(user.message == "Bad credentials") 先清空本地token 在跳登录页 解决如果客户端token被删除情况
                        let userInfo = Object.assign({}, user, {
                            token: token
                        })
                        this.props.dispatch(actions.updateUser(userInfo))
                        SplashScreen.hide(); //关闭启动屏幕
                        this.props.navigation.dispatch(resetHome)
                    })
                }
            })
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    } 

    render() {
        return null
    }
}

const mapStateToProps = state => ({
    theme: state.globalDataState.theme,
    locale: state.globalDataState.locale,
    user: state.globalDataState.user
})

export default connect(mapStateToProps)(WelcomeScreen)
