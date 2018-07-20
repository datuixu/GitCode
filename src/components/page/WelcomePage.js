/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import NavigatorUtil from '../util/NavigatorUtil'
import ThemeDao from '../expand/dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import * as actions from '../../actions/requestGlobalData'
import {ThemeFactory} from '../../res/styles/ThemeFactory'

class WelcomePage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        new ThemeDao().getTheme().then((key) => {
            this.props.dispatch(actions.updateThemeFactory(ThemeFactory[key]))
        })
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            this.props.navigation.navigate('LoginPage', { name: 'LoginPage' })
            // NavigatorUtil.resetToHomePage({
            //     // theme: this.theme,
            //     navigation: this.props.navigation
            // })
        }, 500)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    } 

    render() {
        return null
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    tips: {
        fontSize: 29
    }
})

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(WelcomePage)
