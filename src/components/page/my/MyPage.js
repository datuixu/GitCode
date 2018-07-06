import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'

export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
