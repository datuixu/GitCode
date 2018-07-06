/**
 * Created by penn on 2016/12/21.
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
const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const deviceWidth = Dimensions.get('window').width;
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectModels: [],
            languages: [],
        }
    }

    componentDidMount() {
    }


    render() {
        var statusBar = {
            backgroundColor: '#2196F3',
            barStyle: 'light-content',
            translucent: false
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('popular.title')}
                statusBar={statusBar}
            />;
        let content = <ScrollableTabView
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

          <PopularTab tabLabel="Java">Java</PopularTab>
          <PopularTab tabLabel="Ios">Ios</PopularTab>
          <PopularTab tabLabel="Vue">Vue</PopularTab>
          <PopularTab tabLabel="React">React</PopularTab>

        </ScrollableTabView>
        return <View style={styles.container}>
                 {navigationBar}
                 {content}
               </View>
    }

}

class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
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
        this.dataRepository
            .fetchNetRepository(url)
            .then(result =>{
                this.setState({
                    result:result.items,
                    isFirst:false,
                    isRefreshing:false
                })
            })
            .catch(error =>{
                console.log(error)
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
                        // ListHeaderComponent={() => this._renderHeader()}
                        onScroll={event => this._onScroll(event)}
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
        const projectModel = data.item
        return (
            <RepositoryCell 
              data={projectModel}
            />
        )
    }
    _onRefresh(){
        console.log(111)
        this.loadData(this.state.isFirst)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        // backgroundColor:"#f6f6f6",
    },
    tips: {
        fontSize: 20
    }
})
