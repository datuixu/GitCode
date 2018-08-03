/**
 * Created on 2018/4/9
 * 
 *  @author wangjiahuan
 * trending模块的选择语言 的每个item 为了解决单独渲染 提高性能
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
}from 'react-native'
import GlobalStyles from '../../res/styles/GlobalStyles'
import Icon from './Icon'
export default class LanguageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }
      // 判断是否需要重新渲染页面
      // 这个方法在初始化render时不会执行，当props或者state发生变化时执行，
      // 并且是在render之前，当新的props或者state不需要更新组件时，返回false
      shouldComponentUpdate(nextProps, nextState) {
        const {data,selectKey,isRenderer,isRendererItem,prevKey} = nextProps
        if(isRenderer == true){
            if(isRendererItem == true){
                if(selectKey === data.item.language || prevKey == data.item.language){
                    return true
                }else{
                    return false
                }
            }else{
                return true
            }
        }else{
            return false
        }
      }
      componentDidUpdate(){ // 组件更新结束之后执行，在初始化render时不执行
        if(this.props.isRendererItem == true){
            this.props.updateIsRendererItem()
        }
      }
      render() {
        const {item,index} = this.props.data
        return <TouchableOpacity key={index} style={[GlobalStyles.cell_container,{alignItems:'center'}]} activeOpacity={0.7} onPress={()=>this.props.selectLanguage(item,index)}>
                    <View style={[styles.colorView,{backgroundColor:item.color}]}></View>
                    <Text style={{flex:1,color:'#000000'}}>{item.language}</Text>
                    {this.props.selectKey == item.language ? <Icon name="commit" style={{color:'#2196F3',fontSize:20}}/> : null}
                </TouchableOpacity>
      }
}

const styles = StyleSheet.create({
    colorView:{
        width:12,
        height:12,
        borderRadius:50,
        marginRight:8
    }
})