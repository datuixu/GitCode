/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
    StatusBar
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }
    render() {
        var statusBar = {
            animated: true, //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden 
            hidden: false , //是否隐藏状态栏。   
            backgroundColor: 'rgba(0,0,0,.1)', //状态栏的背景色  
            translucent: true,//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                hide={true}
                statusBar={statusBar}
            />
        return(
            <View style={styles.container}>
              {navigationBar}
              <WebView 
                source={require('../login-index1/index.html')}
                onMessage={(e)=>{   // 当html中调用了window.postMessage函数后，WebView的onMessage函数将会被回调，用来处理html向rn发送的数据,可以通过e.nativeEvent.data获取发送过来的数据。
                    const message = e.nativeEvent.data;
                    this.setState({
                        username:message.split(',')[0],
                        password:message.split(',')[1]
                    })
                    this.props.navigation.navigate('HomeNavigator', { name: 'HomeNavigator' })
                }} 
              />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 26,
        width: 26,
    }
});