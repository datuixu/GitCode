/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView
} from 'react-native';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }

    render() {
        return(
            <View style={styles.container}>
              <WebView 
                source={require('../login-index1/index.html')}
                onMessage={(e)=>{   // 当html中调用了window.postMessage函数后，WebView的onMessage函数将会被回调，用来处理html向rn发送的数据,可以通过e.nativeEvent.data获取发送过来的数据。
                    const message = e.nativeEvent.data;
                    this.setState({
                        username:message.split(',')[0],
                        password:message.split(',')[1]
                    })
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