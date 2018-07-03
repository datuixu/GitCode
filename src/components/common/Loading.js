import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';


export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {

        return(
                <View style={styles.loadingBox}>
                  <Image style={styles.loading} source={require('../../res/images/loading.gif')}/>
                  <Text style={{color:'#757575'}}>{this.props.text}</Text>
                </View>
        );
    }

}

const styles = StyleSheet.create({
    loadingBox: { 
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    loading:{
        width:50,
        height:50,
        marginBottom:8
    },

})