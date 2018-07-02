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
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import DataRepository,{FLAG_STORAGE} from '../../expand/dao/DataRepository'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
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
        }
        let navigationBar =
            <NavigationBar
                title={'最热'}
                statusBar={statusBar}
            />;
        let content = <ScrollableTabView
          renderTabBar={()=><ScrollableTabBar/>}
        >
          <PopularTab tabLabel="Java">java</PopularTab>
          <PopularTab tabLabel="ios">ios</PopularTab>
          <PopularTab tabLabel="vue">vue</PopularTab>
          <PopularTab tabLabel="react">react</PopularTab>

        </ScrollableTabView>
        return <View style={styles.container}>
                 {navigationBar}
                 {content}
                 {/* <FlatList
                    data={this.state.projectModels}
                    renderItem={(data) => this.renderRow(data)}
                    keyExtractor={item => ""+item.item.id}
                /> */}
               </View>
    }
    renderRow(data) {
        const projectModel = data.item;
        return <RepositoryCell
            key={projectModel.item.id}
            projectModel={projectModel}
            theme={this.props.theme}
            onSelect={() => ActionUtils.onSelectRepository({
                projectModel: projectModel,
                flag: FLAG_STORAGE.flag_popular,
                ...this.props,
                onUpdateFavorite: () => this.onUpdateFavorite(),
            })}
            onFavorite={(item, isFavorite) => ActionUtils.onFavorite(favoriteDao, item, isFavorite)}/>
    }
}

class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        this.state = {
            result:''
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        let url = URL+this.props.tabLabel+QUERY_STR
        this.dataRepository
            .fetchRepository(url)
            .then(result =>{
                this.setState({
                    resule:JSON.stringify(result)
                })
            })
            .catch(error =>{
                console.log(error)
            })
    }
    render(){
        return(
            <View>
                <Text style={{height:600}}>{this.state.result}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})
