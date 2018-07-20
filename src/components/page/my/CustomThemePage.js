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
    Modal
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import {ThemeFactory} from '../../../res/styles/ThemeFactory'
import * as actions from '../../../actions/requestGlobalData'
import ThemeDao from '../../expand/dao/ThemeDao'
import ViewUtils from '../../util/ViewUtils'
import Icon from '../../common/Icon'
import GlobalStyles from '../../../res/styles/GlobalStyles'

const deviceWidth = Dimensions.get('window').width
class CustomThemePage extends Component {
   constructor(props) {
        super(props)
        // this.themeDao=new ThemeDao()
        this.state = {
            visible:false
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
                    <Icon name="home" size={20} color={theme.textColor} style={{marginTop:10}}/>
                </LinearGradient>
                : 
                <View style={[{backgroundColor:theme.themeColor,width:(deviceWidth-18)/3,},GlobalStyles.cell_custom_theme]}>
                    <Text style={[styles.themeText,{color:theme.textColor,fontFamily:'mintcream'}]}>{key}</Text>
                    <Icon name="home" size={20} color={theme.textColor} style={{marginTop:10}}/>
                </View>
            }
            {this.props.theme.key == key ?
               <View style={[GlobalStyles.cell_setting,{backgroundColor:'#eaebed'}]}>
                 <Text style={{color:'#babcbb'}}>{I18n.t('my.custom_theme_use_set')}</Text>
               </View>
                :
               <TouchableOpacity activeOpacity={0.7} onPress={()=>this.changeTheme(theme)} style={[GlobalStyles.cell_setting,{backgroundColor:'white'}]}>
                <Text style={{color:'#000000'}}>{I18n.t('my.custom_theme_set')}</Text>
               </TouchableOpacity>
            }
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
   changeTheme(theme){
    this.setState({visible:true})
    setTimeout(()=>{
        this.props.dispatch(actions.updateThemeFactory(theme))
    },800)
    setTimeout(()=>{
        this.setState({visible:false})
    },1000)
    
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
            titleColor={this.props.theme.textColor}
            statusBar={statusBar}
            isLinearGradient={true}
            leftButton={ViewUtils.getLeftButton(()=>this.props.navigation.goBack())}
    />
    return <View style={styles.container}>
            {navigationBar}
            <ScrollView>
              {this.renderContentView()}
            </ScrollView>
            <Modal 
                visible={this.state.visible} //决定模态是否可见
                transparent={true}//(透明度) true时，使用透明背景渲染模态。 
                animationType={'fade'}//none slide fade 动画类型
                onRequestClose={()=>{return false}} //android点返回键触发被销毁时会调用此函数
            >
                <View style={styles.modalView}>
                    <View style={[styles.modal_container,{width:deviceWidth-100}]}>
                        <Image style={styles.image} source={require('../../../res/images/load.gif')}/>
                        <Text style={{color:'#FFFFFF',fontSize:15}}>{I18n.t('my.change_theme_title')}</Text>
                    </View>
                </View>
            </Modal>
           </View>
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modal_container:{
        flexDirection:'row',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding:13,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    modalView:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems:'center',
        justifyContent:'center'
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
    },
    image:{
        width:20,
        height:20,
        marginRight:5,
        marginTop:2
    }
});

const mapStateToProps = state => ({
    theme: state.globalDataState.theme,
})

export default connect(mapStateToProps)(CustomThemePage)