/**
 * Created by wangjh on 2018/6/26.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity,
    Button
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import { connect } from 'react-redux'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log(this.props)
        const {theme,navigation} = this.props
        var statusBar = {
            animated: true,
            backgroundColor: 'rgba(0,0,0,0)',
            barStyle: 'light-content',
            translucent: true
        }
        let navigationBar =
            <NavigationBar
                title=''
                statusBar={statusBar}
                titleColor={theme.textColor}
                isLinearGradient={theme.isLinearGradient}
                themeColor={theme.themeColor}
            />;
        return <View style={styles.container}>
                 {navigationBar}
                 <Button
                    onPress={() => {navigation.openDrawer()}}
                    title=" MyHomeScreen ----> open drawer"
                />
               </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(HomePage)