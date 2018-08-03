/**
 * Created on 2018/4/9
 * 
 *  @author wangjiahuan
 * 上拉加载 底部footer组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
}from 'react-native';
import {I18n} from '../../language/i18n'
let {width, height} = Dimensions.get('window');

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }
      render() {
        const content = this.props.isMoreData ? <View style={{flexDirection:'row',justifyContent:'center',marginTop:5,marginBottom:5}}>
                            <Image style={styles.loading} source={require('../../res/images/loading.gif')}/>
                            <Text style={{color:'#757575',fontSize:12,marginTop:3}}>{I18n.t('loading.title')}</Text>
                        </View> :
                        <View  style={{flexDirection:'row',justifyContent:'center',marginTop:5,marginBottom:5}}>
                            <Text style={{color:'#757575',fontSize:12}}>没有更多语言啦~~</Text>
                        </View>
        return content
      }
}

const styles = StyleSheet.create({
    loading:{
        width:20,
        height:20,
        marginRight:8
    }
})