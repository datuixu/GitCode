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

class WelcomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() { // 初始化主题和语言配置
        console.log(this.props)
        new ThemeDao().getTheme().then((key) => {
            this.props.dispatch(actions.updateThemeFactory(ThemeFactory[key]))
        })
        new I18nDao().getI18n().then((lan) => {
            this.props.dispatch(actions.updateLocale(lan))
        })

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: "LoginScreen"
                })
            ]
        })
        this.timer = setTimeout(() => {
            SplashScreen.hide(); //关闭启动屏幕
            this.props.navigation.dispatch(resetAction)
        }, 800)
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
    locale: state.globalDataState.locale
})

export default connect(mapStateToProps)(WelcomeScreen)