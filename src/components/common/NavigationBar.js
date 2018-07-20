/**
 * NavigationBar
 * @flow
 */
import React, {Component} from 'react';

import {
    StyleSheet,
    Platform,
    DeviceInfo,
    Image,
    StatusBar,
    Text,
    View,
    ViewPropTypes,
    BVLinearGraient
} from 'react-native'
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 70;
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;
const MARGIN_TOP = DeviceInfo.isIPhoneX_deprecated ? 0 : 20;
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default',]),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};
export default class NavigationBar extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton:  PropTypes.element,
        leftButton: PropTypes.element,
        isLinearGradient: PropTypes.bool,
        themeColor: PropTypes.oneOfType([PropTypes.string,PropTypes.array])
    }
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        };
    }

    getButtonElement(data) {
        return (
            <View style={styles.navBarButton}>
                {data? data : null}
            </View>
        );
    }

    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <LinearGradient style={styles.statusBar} start={{x: 0, y: 0}}  end={{x: 1, y: 0}} colors={['#4f8dfe', '#31b7fe', '#37bafe']} >
                <StatusBar {...this.props.statusBar} />
            </LinearGradient>: null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode="head" numberOfLines={1} style={[styles.title,{color:this.props.titleColor}]}>{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>;
        return (
            this.props.isLinearGradient ? <LinearGradient start={{x: 0, y: 0}}  end={{x: 1, y: 0}} colors={this.props.themeColor} style={this.props.style}>
                    {statusBar}
                    {content}
            </LinearGradient> :
                <View style={[this.props.style,{backgroundColor:this.props.themeColor}]}>
                    {statusBar}
                    {content}
                </View>
           
        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:MARGIN_TOP,
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,

    },
})
