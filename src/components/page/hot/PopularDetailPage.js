/**
 * Created  on 2017/7/1.
 * 
 *  @author wangjiahuan
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    Dimensions
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import ViewUtils from '../../util/ViewUtils'
import NavigatorUtil from '../../util/NavigatorUtil'
export default class PopularDetailPage extends Component {
    constructor(props) {
        super(props)
        // this.url = this.props.item.
        let title = this.props.navigation.state.params.item.full_name
        this.state = {
            title:title
        }
    }

    render() {
        const {navigation} = this.props
        var statusBar = {
            backgroundColor: '#2196F3',
            barStyle: 'light-content',
            translucent: false
        }
        let navigationBar =
            <NavigationBar
                title={this.state.title}
                statusBar={statusBar}
                leftButton={ViewUtils.getLeftButton(()=>NavigatorUtil.goBack(navigation))}
                // rightButton={ViewUtils.getRightButton(rightButton,()=>this.onSave(navigation))}
            />
        return <View style={styles.container}>
            {navigationBar}
          </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})