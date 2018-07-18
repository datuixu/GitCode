/**
 * Created by wangjh on 2017/7/1.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    FlatList,
    RefreshControl,
    DeviceEventEmitter,
    Dimensions
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import {TabNavigator} from 'react-navigation'
import SafeAreaViewPlus from '../../common/SafeAreaViewPlus'
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository'
import RepositoryCell from '../../common/RepositoryCell'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import Loading from '../../common/Loading'
import Utils from '../../util/Utils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&page=1&per_page=10&sort=stars'
const deviceWidth = Dimensions.get('window').width;
var dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.state = {
            projectModels: [],
            languages: [],
        }
        this.loadLanguage()
    }
    // componentDidMount() {
    //     this.loadData()
    // }
    loadLanguage(){
        this.LanguageDao.fetch()
            .then(res =>{
               this.setState({
                languages:res
               })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        var statusBar = {
            animated: true,
            backgroundColor: 'rgba(0,0,0,0)',
            barStyle: 'light-content',
            translucent: true
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('popular.title')}
                statusBar={statusBar}
                isLinearGradient={true}
            />;
        let content = this.state.languages.length > 0 ? 
        <ScrollableTabView
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
        {this.state.languages.map((result,i,arr)=>{
          let lan = arr[i]
          return lan.checked ? <PopularTab key={i} tabLabel={lan.name} {...this.props}></PopularTab> : null
        })}

        </ScrollableTabView>
        :
        null
        return <View style={styles.container}>
                 {navigationBar}
                 {content}
               </View>
    }

}

class PopularTab extends Component{
    constructor(props) {
        super(props);
        // this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular)
        this.state = {
            result:[],
            isRefreshing:false,
            isFirst:true
        }
    }
    componentDidMount(){
        this.loadData(this.state.isFirst)
    }
    loadData(isFirst){
        this.setState({
            isRefreshing :isFirst ? false : true
        })
        let url = URL+this.props.tabLabel+QUERY_STR
        dataRepository
            .fetchRepository(url)
            .then(result =>{
                // return dataRepository.fetchNetRepository(url)
                let items = result && result.items ? result.items : result ? result : []
                if (result && result.update_date && !Utils.checkDate(result.update_date)) return dataRepository.fetchNetRepository(url)
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
                console.log(error)
                this.setState({
                    isRefreshing:false
                })
            })
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
                        keyExtractor={item => item.id.toString()} //FlatList 每一行需要一个key
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
            <RepositoryCell 
              data={item}
              onSelect={()=>this.onSelect(item)}
            />
        )
    }
    _onRefresh(){
        this.loadData(this.state.isFirst)
    }
    onSelect(item){
        console.log(this.props.navigation)
        this.props.navigation.navigate('PopularDetailPage',{item:item})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'white',
        // backgroundColor:"#f6f6f6",
    },
    tips: {
        fontSize: 20
    }
})
