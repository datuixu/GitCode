import React, { Component,PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../actions/requestTrendingData'
import CheckBox from 'react-native-check-box'
import langsData from '../../res/data/langs.json'
import LanguageItem from '../common/LanguageItem'
import {I18n} from '../../language/i18n'

import languageColors from '../../res/data/language_colors.json'
import Footer from '../common/Footer'
const deviceWidth = Dimensions.get('window').width

class TrendingDrawerItems extends Component {
    constructor(props) {
        super(props);
        this.prevIndex = 0 // 前一个选中的语言
        this.startNo = 0 // 分页初始值
        this.endNo = 19 // 分页结束值
        this.items = [] //存储数据用于分页
        this.state = {
            isMoreData:true // 是否有更多数据
        };
    }
    componentDidMount(){
        this.loadLanguages()
    }
    componentDidUpdate(){ // 组件更新结束之后执行，在初始化render时不执行
        this.prevIndex = this.props.selectIndex
        if(this.props.isRenderer == true){
            this.props.dispatch(actions.updateIsRenderer(false))
        }
    }
    // 判断是否需要重新渲染页面
    // 这个方法在初始化render时不会执行，当props或者state发生变化时执行，
    // 并且是在render之前，当新的props或者state不需要更新组件时，返回false
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.isRenderer == true){
            return true
        }else{
            return false
        }
    }
    loadLanguages(){
        let items = []
        Object.keys(languageColors).forEach((key,index)=>{
          if(this.startNo <= index && index <= this.endNo){
            items.push({
                language:key,
                color:languageColors[key].color,
                url:languageColors[key].url
            })
          }
        })
        this.items = this.items.concat(items)
        this.props.dispatch(actions.updateTrendingLans(this.items))
        this.startNo = this.startNo+20
        this.endNo = this.endNo+20
        if(this.startNo >= Object.keys(languageColors).length){
            this.setState({
                isMoreData:false
            })
        }
    }
    endReached(){
        if(this.state.isMoreData){
            this.props.dispatch(actions.updateIsRenderer(true))
            this.loadLanguages()
        }else{
            return
        }
    }
    renderRow(data){
        return <LanguageItem 
                data={data} 
                prevIndex={this.prevIndex}
                selectIndex={this.props.selectIndex}
                isRenderer={this.props.isRenderer}
                isRendererItem={this.props.isRendererItem}
                selectLanguage={(item,index)=>this.selectLanguage(item,index)}
                updateIsRendererItem={()=>this.props.dispatch(actions.updateIsRendererItem(false))}
               />
    }
    renderFooter(){
        return(
            <Footer 
              isMoreData={this.state.isMoreData}
            />
        )
    }
    selectLanguage(item,index){
       this.props.navigation.closeDrawer()
       this.props.dispatch(actions.updateSelcetIndex(index))
       setTimeout(() => {
        this.props.dispatch(actions.updateIsRenderer(true))
        this.props.dispatch(actions.updateIsRendererItem(true))
       }, 50)
       
    }
    render(){
        const {navigation} = this.props
        return(
            <View style={{backgroundColor: '#e6e6e6', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                  <View style={styles.topView}>
                      <Text style={{color:'white',fontSize:18,marginRight:10}}>{I18n.t('trending.select_lan_nav_title')}</Text>
                      <Image style={{width:23,height:23}} source={require('../../res/images/ic_search_white_48pt.png')}/>
                  </View>
                  <FlatList
                        style={{marginBottom:55}}
                        data={this.props.languages}
                        renderItem={(data) => this.renderRow(data)}
                        keyExtractor={item => item.language} //FlatList 每一行需要一个key
                        initialNumToRender={20}
                        ListFooterComponent={() => this.renderFooter()}
                        onEndReached={()=> this.endReached()} //上拉加载
                        onEndReachedThreshold={0.2} //这个值是触发onEndReached方法的阈值
                  />
                </SafeAreaView>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    topView:{
        flexDirection:'row',
        backgroundColor:'#2196F3',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:3
    }

})

const mapStateToProps = state => ({
    selectIndex: state.trendigDataState.selectIndex,
    languages:state.trendigDataState.languages,
    isRenderer:state.trendigDataState.isRenderer,
    isRendererItem:state.trendigDataState.isRendererItem
})

export default connect(mapStateToProps)(TrendingDrawerItems)