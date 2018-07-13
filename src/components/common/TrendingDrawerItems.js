import React, { Component } from 'react';
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
import CheckBox from 'react-native-check-box'
import langsData from '../../res/data/langs.json'
import {I18n} from '../../language/i18n'
import GlobalStyles from '../../res/styles/GlobalStyles'
import languageColors from '../../res/data/language_colors.json'
import Footer from '../common/Footer'
const deviceWidth = Dimensions.get('window').width

export default class TrendingDrawerItems extends Component {
    constructor(props) {
        super(props);
        this.startNo = 0 // 分页初始值
        this.endNo = 19 // 分页结束值
        this.items = [] //存储数据用于分页
        this.state = {
            languages:[],
            checkeIndex:0
        };
    }
    componentDidMount(){
        this.loadLanguages()
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
        this.setState({
            languages : this.items
        })
        this.startNo = this.startNo+20
        this.endNo = this.endNo+20
    }
    endReached(){
        this.loadLanguages()
    }
    renderRow(data){
        console.log(data)
        const {item,index} = data
        return  <TouchableOpacity key={index} style={[GlobalStyles.cell_container,{alignItems:'center'}]} activeOpacity={0.7} onPress={()=>this.selectLanguage(item,index)}>
                    <View style={[styles.colorView,{backgroundColor:item.color}]}></View>
                    <Text style={{flex:1,color:'#000000'}}>{item.language}</Text>
                    {this.state.checkeIndex == index ? <Image source={require('../../res/images/ic_check_box.png')} style={{tintColor:'#6495ED'}}/> : null}
                </TouchableOpacity>
     
    }
    renderFooter(){
        return(
            <Footer />
        )
    }
    selectLanguage(item,index){
       console.log(index)
       this.setState({
           checkeIndex:index
       })
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
                        data={this.state.languages}
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
    },
    colorView:{
        width:12,
        height:12,
        borderRadius:50,
        marginRight:8
    }
})