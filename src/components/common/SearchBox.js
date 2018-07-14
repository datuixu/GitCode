/**
 * Created by wangjh on 2018/7/14
 * 搜索组件
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    TextInput
}from 'react-native'

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:''
        }
    }
    _changeText(text){
        this.setState({
            text:text
        })
    }
    render(){
        return (
            <View style={[styles.textInputView,{width:this.props.width}]}>
                <TextInput
                    ref = 'textInput'
                    editable = {true}
                    maxLength = {40}
                    numberOfLines = {1}
                    underlineColorAndroid={'transparent'}
                    placeholder={this.props.placeholderText}
                    placeholderTextColor={'#f6f6f6'}
                    style={styles.searchInput}
                    autoFocus={false}
                    onChangeText={(text) => this._changeText(text)}
                    returnKeyType={'search'}
                />
           </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputView:{
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 3,
        height:30,
        flexDirection: 'row',
        borderRadius:2,
    },
    searchInput:{
        flex:1,
        height:30,
        padding: 5,
        fontSize:12,
        color:'#f6f6f6'
    }
})