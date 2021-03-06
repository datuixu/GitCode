/**
 * Created on 2018/7/14
 * 
 *  @author wangjiahuan
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
    componentDidUpdate(){ // 组件更新结束之后执行，在初始化render时不执行
       this.props.updateIsRenderer()
    }
    _changeText(text){
        this.setState({
            text:text
        })
        this.props.search(text)
    }
    render(){
        return (
            <View style={[styles.textInputView,{width:this.props.width}]}>
                <TextInput
                    ref = 'textInput'
                    editable = {true}
                    keyboardType={this.props.keyboardType} //弹出哪种键盘
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