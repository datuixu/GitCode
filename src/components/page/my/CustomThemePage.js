import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    BVLinearGraient,
    Button
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import {ThemeFactory} from '../../../res/styles/ThemeFactory'
import ThemeDao from '../../expand/dao/ThemeDao'
import Icon from '../../common/Icon'
import GlobalStyles from '../../../res/styles/GlobalStyles'

const deviceWidth = Dimensions.get('window').width
export default class CustomThemePage extends Component {
   constructor(props) {
        super(props)
        // this.themeDao=new ThemeDao()
        this.state = {
        }
   }
   getThemeItem(key){
       let theme 
       if(key){
        theme = ThemeFactory[key]
       }else{
           return null
       }
       return <View>
            {theme.isLinearGradient ? 
                <LinearGradient colors={theme.themeColor} style={[GlobalStyles.cell_custom_theme,{width:(deviceWidth-18)/3,}]}>
                    <Text style={[styles.themeText,{color:theme.textColor,fontFamily:'mintcream'}]}>{key}</Text>
                    <Icon name="home" color={theme.textColor}/>
                </LinearGradient>
                : 
                <View style={[{backgroundColor:theme.themeColor,width:(deviceWidth-18)/3,},GlobalStyles.cell_custom_theme]}>
                    <Text style={[styles.themeText,{color:theme.textColor,fontFamily:'mintcream'}]}>{key}</Text>
                    <Icon name="home" color={theme.textColor}/>
                </View>
            }
            <View style={[GlobalStyles.cell_setting,{backgroundColor:'white'}]}>
                <Text >应用</Text>
            </View>
        </View>
   }
   renderContentView(){
    var views=[]
    for (let i=0,keys=Object.keys(ThemeFactory),l=keys.length;i<l;i+=3){
        var key1=keys[i],key2=keys[i+1],key3=keys[i+2]
        views.push(<View key={i} style={{flexDirection:'row'}}>
            {this.getThemeItem(key1)}
            {this.getThemeItem(key2)}
            {this.getThemeItem(key3)}
        </View>)
    }
    return views
   }
   render(){
    var statusBar = {
        animated: true,
        backgroundColor: 'rgba(0,0,0,0)',
        barStyle: 'light-content',
        translucent: true
    }
    let navigationBar =
        <NavigationBar
            title={I18n.t('my.custom_theme_title')}
            statusBar={statusBar}
            isLinearGradient={true}
    />
    return <View style={styles.container}>
            {navigationBar}
            <ScrollView>
              {this.renderContentView()}
            </ScrollView>
           </View>
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    themeItem: {
        height: 150,
        margin:3,
        borderRadius:2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2, // android
    },
    themeText:{
        fontWeight:'500',
        fontSize:16
    }
});