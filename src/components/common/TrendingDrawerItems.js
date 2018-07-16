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
    FlatList,
    TextInput
} from 'react-native';
import { connect } from 'react-redux'
import * as actions from '../../actions/requestTrendingData'
import LanguageItem from '../common/LanguageItem'
import {I18n} from '../../language/i18n'
import languageColors from '../../res/data/language_colors.json'
import Footer from '../common/Footer'
import Icon from '../common/Icon'
import SearchBox from '../common/SearchBox'
import Utils from '../util/Utils'

const deviceWidth = Dimensions.get('window').width
class TrendingDrawerItems extends Component {
    constructor(props) {
        super(props);
        this.prevKey = 'All Languages' // 前一个选中的语言
        this.startNo = 0 // 分页初始值
        this.endNo = 19 // 分页结束值
        this.items = [] //存储数据用于分页
        this.isMoreData = true
        this.searchText=''
        this.state = {
            searching:false
        };
    }
    componentDidMount(){
        this.loadLanguages(true,this.startNo,this.endNo)
    }
    componentDidUpdate(){ // 组件更新结束之后执行，在初始化render时不执行
        this.prevKey = this.props.selectKey
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
    loadLanguages(isLoadMore,startNo,endNo){
        let items = []
        if(!this.isMoreData && isLoadMore){ //如果上拉加载没有更多数据 直接返回
           return
        }else{
            this.props.dispatch(actions.updateIsRenderer(true))
            if(!isLoadMore) { // 不是上拉加载更多
                if(this.items.length > 0){
                    this.refs.flatList.scrollToIndex({viewPosition:0,index:0})
                }
                this.items=[]
            }
            this.loadMoreData(startNo,endNo,items,isLoadMore)
            this.common(items,isLoadMore)
        }
    }
    loadMoreData(startNo,endNo,items,isLoadMore){
            if(this.searchText !== ''){
                let searchItems = []
                Object.keys(languageColors).forEach((key,i)=>{
                    if(Utils.coverString(this.searchText,key)){
                        searchItems.push({
                            language:key,
                            color:languageColors[key].color,
                            url:languageColors[key].url
                        })
                    }
                })
                if(searchItems.length > 0){
                    searchItems.forEach((item,index)=>{
                        if(startNo <= index && index <= endNo){
                            items.push({
                                language:item.language,
                                color:item.color,
                                url:item.url
                            })
                        }
                    })
                }
                if((items.length < 20) || ((startNo+20) >= searchItems.length)){
                    this.isMoreData = false
                }
            }else{
                Object.keys(languageColors).forEach((key,index)=>{
                    if(startNo <= index && index <= endNo){
                        items.push({
                            language:key,
                            color:languageColors[key].color,
                            url:languageColors[key].url
                        })
                    }
                })
                if((items.length < 20) || ((startNo+20) >= languageColors.length)){
                    this.isMoreData = false
                }
            }
    }
    common(items,isLoadMore){
        this.items = this.items.concat(items)
        this.props.dispatch(actions.updateTrendingLans(this.items))
        this.startNo = this.startNo+20
        this.endNo = this.endNo+20
    }
    endReached(){
        this.loadLanguages(true,this.startNo,this.endNo)
    }
    renderRow(data){
        return <LanguageItem 
                data={data} 
                prevKey={this.prevKey}
                selectKey={this.props.selectKey}
                isRenderer={this.props.isRenderer}
                isRendererItem={this.props.isRendererItem}
                selectLanguage={(item,index)=>this.selectLanguage(item,index)}
                updateIsRendererItem={()=>this.props.dispatch(actions.updateIsRendererItem(false))}
               />
    }
    renderFooter(){
        return(
            <Footer 
              isMoreData={this.isMoreData}
            />
        )
    }
    selectLanguage(item,index){
       this.props.dispatch(actions.updateSelcetKey(item.language))
       this.props.dispatch(actions.updateUrl(item.url))
       this.props.navigation.closeDrawer()
       setTimeout(() => {
        this.props.dispatch(actions.updateIsRenderer(true))
        this.props.dispatch(actions.updateIsRendererItem(true))
       }, 50)
       
    }
    showSearchBox(){
        this.props.dispatch(actions.updateIsRenderer(true))
        this.setState({searching:true})
    }
    searchLanguage(text){
        this.searchText=text
        this.isMoreData = true
        this.startNo = 0
        this.endNo = 19
        this.loadLanguages(false,this.startNo,this.endNo)
    }
    updateIsRenderer(){
        if(this.props.isRenderer == true){
            this.props.dispatch(actions.updateIsRenderer(false))
        }
    }
    render(){
        const {navigation} = this.props
        return(
            <View style={{backgroundColor: '#e6e6e6', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                  <View style={[styles.topView,{height:this.state.searching?80:50}]}>
                      <View style={styles.titleView}>
                        <Text style={{color:'white',fontSize:18,marginRight:10}}>{I18n.t('trending.select_lan_nav_title')}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>this.showSearchBox()}>
                            <Icon name="search" style={{fontSize:15,color:'#ffffff',marginTop:2}}/>
                        </TouchableOpacity>
                      </View>
                      {this.state.searching ? 
                        <View style={{marginTop:5}}>
                            <SearchBox 
                                width={deviceWidth-210}
                                placeholderText={I18n.t('trending.placeholder_text')}
                                keyboardType='email-address'
                                search={(text)=>this.searchLanguage(text)}
                                updateIsRenderer={()=>this.updateIsRenderer()}
                            />
                        </View>:
                        null
                      }
                  </View>
                  {this.items.length > 0 ?                  
                   <FlatList
                        ref='flatList'
                        style={{marginBottom: this.state.searching ? 85 : 55}}
                        data={this.props.languages}
                        renderItem={(data) => this.renderRow(data)}
                        keyExtractor={item => item.language} //FlatList 每一行需要一个key
                        initialNumToRender={20}
                        ListFooterComponent={() => this.renderFooter()}
                        onEndReached={()=> this.endReached()} //上拉加载
                        onEndReachedThreshold={0.2} //这个值是触发onEndReached方法的阈值
                  />:
                  <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                      <Text style={{fontSize:12}}>{I18n.t('trending.no_search_result')}</Text>
                  </View>
                }
                </SafeAreaView>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    topView:{
        backgroundColor:'#2196F3',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:3
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    }

})

const mapStateToProps = state => ({
    selectKey: state.trendigDataState.selectKey,
    languages:state.trendigDataState.languages,
    isRenderer:state.trendigDataState.isRenderer,
    isRendererItem:state.trendigDataState.isRendererItem,
    url:state.trendigDataState.url
})

export default connect(mapStateToProps)(TrendingDrawerItems)