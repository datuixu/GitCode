/**
 * Created by wangjh on 2017/7/1.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../actions/requestTrendingData'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus'
import Icon from '../../common/Icon'
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository'
import TrendingCell from '../../common/TrendingCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Loading from '../../common/Loading'
import Utils from '../../util/Utils'
import ViewUtils from '../../util/ViewUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import TimeSpan from '../../model/TimeSpan'


const timeSpanTextArray = [new TimeSpan(I18n.t('trending.since_daily'),'since=daily'),
                           new TimeSpan(I18n.t('trending.since_weekly'),'since=weekly'),
                           new TimeSpan(I18n.t('trending.since_monthly'),'since=monthly')]

class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_language)
        this.state = {
            projectModels: [],
            isVisible: false,
        }
    }
    componentWillReceiveProps(nextProps){
        const {selectKey} = nextProps
        if(this.props.selectKey == selectKey)return
        this.props.dispatch(actions.updateSelcetKey(selectKey))
    }
    // 判断是否需要重新渲染页面
    // 这个方法在初始化render时不会执行，当props或者state发生变化时执行，
    // 并且是在render之前，当新的props或者state不需要更新组件时，返回false
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextProps.isRenderer == true){
    //         return true
    //     }else{
    //         return false
    //     }
    // }
    componentDidUpdate(){
        this.props.dispatch(actions.updateIsRenderer(false))
    }
    renderTieleView(){
        return <View>
            <Text style={{color:'#FFFFFF',fontSize:16}}>{this.props.selectKey}</Text>
        </View>
    }
    openDrawer(navigation){
        this.props.dispatch(actions.updateIsRenderer(false))
        navigation.toggleDrawer()
    }
    render() {
        const {navigation} = this.props
        var statusBar = {
            animated: true,
            backgroundColor: 'rgba(0,0,0,0)',
            barStyle: 'light-content',
            translucent: true
        }
        let navigationBar =
            <NavigationBar
                titleView={this.renderTieleView()}
                statusBar={statusBar}
                isLinearGradient={false}
                leftButton={<Text style={styles.leftButton}>{I18n.t('trending.title')}</Text>}
                rightButton={ViewUtils.getRightButton(<Icon name="switch-language"/>,() => this.openDrawer(navigation))}
            />;
        let content= <ScrollableTabView
          tabBarBackgroundColor="#2196F3"
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarTextStyle={{fontFamily: 'CaviarDreams'}} // 解决android全面屏点击会显示不全问题
          tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar 
                style={{height: 40, borderWidth: 0, elevation: 2}}
                tabStyle={{height: 39}}
          />}
        >
        {timeSpanTextArray.map((result,i,arr)=>{
           return <TrendingTab key={i} tabLabel={arr[i].showText} searchText={arr[i].searchText} {...this.props}></TrendingTab>
        })}
        </ScrollableTabView>
        return <View style={styles.container}>
                 {navigationBar}
                 {content}
               </View>
    }

}

class TrendingTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending)
        this.url = ''
        this.state = {
            result:[],
            isRefreshing:false,
            isFirst:true
        }
    }
    componentDidMount(){
        this.loadData(this.state.isFirst,this.props.url)
    }
    componentWillReceiveProps(nextProps){
        const {url} = nextProps
        if(url == this.url)return
        this.url = url
        this.loadData(this.state.isFirst,url)
    }
    loadData(isFirst,url){
        this.setState({
            isRefreshing :isFirst ? false : true
        })
        let searchUrl = this.genFetchUrl(this.props.searchText,url)
        this.dataRepository
            .fetchRepository(searchUrl)
            .then(result =>{
                // return this.dataRepository.fetchNetRepository(url)
                let items = result && result.items ? result.items : result ? result : []
                if (result && result.update_date && !Utils.checkDate(result.update_date)) return this.dataRepository.fetchNetRepository(url)
                return items
            })
            .then((items) => {
                if (!items || items.length === 0) return
                this.setState({
                    result:items,
                    isFirst:false,
                    isRefreshing:false
                })
            })
            .catch(error =>{
                this.setState({
                    isRefreshing:false
                })
            })
    }
    genFetchUrl(timeSpan,url){
        let searchUrl = url ? url : this.url
        return searchUrl + '?' + timeSpan
    }
    render(){
        if(this.state.result.length == 0){
            return(
                <View>
                    <Loading 
                      text={I18n.t('loading.title')}
                    />
                </View>
            )
        }else{
            return(
                <View>
                    <FlatList
                        data={this.state.result}
                        renderItem={(data) => this.renderRow(data)}
                        keyExtractor={item => item.fullName} //FlatList 每一行需要一个key
                        // onScroll={event => this._onScroll(event)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing} //控制是否可以刷新
                                onRefresh={this._onRefresh.bind(this)} //刷新方法
                                colors={['#459ef7', '#006cff','#2400ff','#3aa4d5']}
                                tintColor={'#2196F3'}
                                title={I18n.t('loading.title')}  
                                titleColor={'#2196F3'}
                            />
                        }
                    />
                </View>
            )
        }
    }
    _onScroll(event){
      console.log(event.nativeEvent.contentOffset.y)
    }
    renderRow(data) {
        const item = data.item
        return (
            <TrendingCell 
              data={item}
              timeSpan={this.props.searchText}
              onSelect={()=>this.onSelect(item)}
            />
        )
    }
    _onRefresh(){
        this.loadData(this.state.isFirst)
    }
    onSelect(item){
        this.props.navigation.navigate('PopularDetailPage',{item:item})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'red',
        // backgroundColor:"#f6f6f6",
    },
    tips: {
        fontSize: 20
    },
    leftButton:{
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft:10
    }
})

const mapStateToProps = state => ({
    isRenderer:state.trendigDataState.isRenderer,
    selectKey:state.trendigDataState.selectKey,
    url:state.trendigDataState.url
})

export default connect(mapStateToProps)(TrendingPage)
