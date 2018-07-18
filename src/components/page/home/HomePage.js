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
import MyPage from '../../page/my/MyPage'

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
            backgroundColor: '#2196F3',
            barStyle: 'light-content',
            translucent: false
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('popular.title')}
                statusBar={statusBar}
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