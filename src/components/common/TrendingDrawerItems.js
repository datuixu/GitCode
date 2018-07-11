import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import CheckBox from 'react-native-check-box'
import langsData from '../../res/data/langs.json'
import {I18n} from '../../language/i18n'
import GlobalStyles from '../../res/styles/GlobalStyles'
const deviceWidth = Dimensions.get('window').width

export default class TrendingDrawerItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderRow(){
        let items = []
        langsData.map((result,i,arr)=>{
            items.push(
                <TouchableOpacity key={i} style={[GlobalStyles.cell_container,{alignItems:'center'}]} activeOpacity={0.7}>
                    <Text style={{flex:1}}>{arr[i].name}</Text>
                    {arr[i].checked ? <Image source={require('../../res/images/ic_check_box.png')} style={{tintColor:'#6495ED'}}/> : null}
                </TouchableOpacity>
            )
        })
        return items
    }
    render(){
        const {navigation} = this.props
        return(
            <ScrollView style={{backgroundColor: '#e6e6e6', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                  <View style={styles.topView}>
                      <Text style={{color:'white',fontSize:18}}>{I18n.t('trending.select_lan_nav_title')}</Text>
                  </View>
                  {this.renderRow()}
                </SafeAreaView>
           </ScrollView>
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
    }
})