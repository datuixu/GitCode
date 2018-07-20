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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const {navigation} = this.props;
        console.log(navigation)
        var statusBar = {
            animated: true,
            backgroundColor: 'rgba(0,0,0,0)',
            barStyle: 'light-content',
            translucent: true
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('home.title')}
                statusBar={statusBar}
                isLinearGradient={false}
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