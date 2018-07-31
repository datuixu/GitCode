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
import Icon from '../../common/Icon'

class HomePage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        }
    }
    componentDidMount(){
        // 通过在componentDidMount里面设置setParams将tabBarLabel的值动态修改
        this.props.navigation.setParams({
            tabBarLabel:I18n.t('home.tab_name',{locale:this.props.locale}),
            trendingTabBarLabel:I18n.t('trending.tab_name',{locale:this.props.locale})
        })
    }
    static navigationOptions =  ({ navigation }) =>({
        tabBarLabel: navigation.state.params.tabBarLabel,
        tabBarIcon: ({tintColor, focused}) => (
            <Icon
                name='home'
                size={24}
                style={{color: focused ? tintColor : '#808394'}}
            />
        )
    })

    render() {
        const {theme,navigation,locale} = this.props
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
    theme: state.globalDataState.theme,
    locale: state.globalDataState.locale
})

export default connect(mapStateToProps)(HomePage)