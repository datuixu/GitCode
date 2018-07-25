import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    BVLinearGraient,
    StatusBar,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import {I18n} from '../../language/i18n'
import Icon from './Icon'

const deviceHeight = Dimensions.get('window').height
// const NAV_BAR_HEIGHT_IOS = 44
// const NAV_BAR_HEIGHT_ANDROID = 70
// const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ? 0 : 20

class HomeDrawerItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        const {navigation,theme} = this.props
        let statusBar =  
            <StatusBar 
                animated={true}
                backgroundColor='rgba(0,0,0,0)'
                barStyle='light-content'
                translucent={true}
            />
        let navigationBar = theme.isLinearGradient ?
            <LinearGradient
                start={{x: 0, y: 0}}  
                end={{x: 1, y: 0}} 
                colors={theme.themeColor}
                style={{height:deviceHeight/5}}
            >
            </LinearGradient>
            :
            <View style={{backgroundColor:theme.themeColor,height:deviceHeight/5}}>
            </View>
        let content = 
            <View style={{height:(deviceHeight/5)*4}}>
              <View style={{marginTop:15}}>

                <TouchableHighlight style={styles.touchStyle} underlayColor={theme.underlayColor} onPress={()=>navigation.navigate('CustomThemePage')}>
                    <View style={styles.row}>
                      <Icon name="theme" color={theme.drawerIconColor} size={24}/>
                      <Text style={[styles.textStyle,{color:theme.drawerTextColor}]}>{I18n.t('my.custom_theme_title')}</Text>
                    </View>
                </TouchableHighlight>

              </View>
            </View>
        let footer = 
            <View style={styles.footerStyle}>
                <View style={{alignItems:'center',marginRight:35}}>
                  <Icon name="setting" size={19} color={theme.drawerIconColor}/>
                  <Text style={{color:theme.drawerTextColor,marginTop:8}}>设置</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Icon name="night" size={19} color={theme.drawerIconColor}/>
                  <Text style={{color:theme.drawerTextColor,marginTop:7.3}}>夜间</Text>
                </View>
            </View>
        return(
            <ScrollView style={{backgroundColor: theme.drawerBackgroundColor, flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    {statusBar}
                    {navigationBar}
                    {content}
                    {footer}
                </SafeAreaView>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    touchStyle:{
        paddingTop:10,
        paddingBottom:10
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:18
    },
    textStyle:{
        fontSize:18,
        marginLeft:8
    },
    footerStyle:{
        position:'absolute',
        left:18,
        bottom:13,
        flexDirection:'row',
        alignItems:'center'
    }
   
})

const mapStateToProps = state => ({
    theme: state.globalDataState.theme
})

export default connect(mapStateToProps)(HomeDrawerItems)