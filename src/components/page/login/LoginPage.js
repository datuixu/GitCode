/**
 * Created by wangjh on 2018/6/26.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    WebView,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import { Fumi,Kohana } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Icon from '../../common/Icon'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }
    render() {
        const {theme,locale} = this.props
        var statusBar = {
            animated: true, //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden 
            backgroundColor: 'rgba(0,0,0,.1)', //状态栏的背景色  
            translucent: true,//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                hide={true}
                statusBar={statusBar}
            />
        const fumiUserNameInput = 
            <Fumi
                style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:5}}
                label={I18n.t('login.user_name',{locale:locale})}
                // inputStyle={{ color: '#f95a25' }}
                selectionColor={theme.textColor}
                iconClass={FontAwesomeIcon}
                iconName={'github-alt'}
                iconColor={theme.iconColor}
                iconSize={20}
            />
        const fumiPassWordInput = 
            <Fumi
                style={{backgroundColor:'rgba(0,0,0,0.5)',borderRadius:5}}
                label={I18n.t('login.pass_word',{locale:locale})}
                password={true}
                selectionColor={theme.textColor}
                iconClass={FontAwesomeIcon} 
                iconName={'lock'}
                iconColor={theme.iconColor}
                iconSize={22}
            />
        return(
            <View style={styles.container}>
             {navigationBar}
             <ScrollView 
                style={{flex:1}}
                keyboardShouldPersistTaps={'handled'}
                // 当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态。多数带有TextInput的情况下你应该选择此项。
             >
                <ImageBackground style={{height:deviceHeight,width:deviceWidth}} source={require('./login_use.png')} resizeMode='cover'>
                    <View style={{position:'absolute',top:deviceHeight/2,left:50,width:deviceWidth-100,}}>
                       {fumiUserNameInput}
                    </View>
                    <View style={{position:'absolute',top:deviceHeight/2+70,left:50,width:deviceWidth-100,}}>
                       {fumiPassWordInput}
                    </View>
                    
                </ImageBackground>
                <Button onPress={()=>this.req()} 
                      title="ssss"
                    //   style={{position:'absolute',top:deviceHeight/2+150,left:50,width:deviceWidth-100,}}
                    />
            </ScrollView>
         </View>
        )
    }

    req(){
        let params = {
            "client_secret": "b4854101132a27baf77840249b5caa67e2891123"
          }
        console.log(111)
        fetch('https://api.github.com/authorizations/clients/3516aaad30d6b260fecd',{
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization':'Basic TXJXYW5namlhaHVhbjptYXl1YW41MjEqKg=='
            },
            body: JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
          })
          .catch((error) => {
            console.error(error);
          });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = state => ({
    theme: state.globalDataState.theme,
    locale: state.globalDataState.locale
})

export default connect(mapStateToProps)(LoginPage)