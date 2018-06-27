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
        }
    }

    render() {
        return(
            <View style={styles.container}>
              <WebView 
                source={require('../login-index1/index.html')}
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