import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import CheckBox from 'react-native-check-box'
import {I18n} from '../../../language/i18n'
import ViewUtils from '../../util/ViewUtils'
import ArrayUtils from '../../util/ArrayUtils'
import NavigatorUtil from '../../util/NavigatorUtil'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
const deviceWidth = Dimensions.get('window').width
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props)
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.changeValues = []
        this.state = {
            keys:[]
        }
    }
    componentDidMount(){
        this.loadData()
    }
    render() {
        const {navigation} = this.props
        var statusBar = {
            backgroundColor: '#2196F3',
            barStyle: 'light-content',
            translucent: false
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('my.custom_key_title')}
                statusBar={statusBar}
                leftButton={ViewUtils.getLeftButton(()=>this.goBack(navigation))}
                rightButton={ViewUtils.getRightButton(I18n.t('my.custom_key_save_text'),()=>this.onSave(navigation))}
            />;
        return <View style={styles.container}>
                 {navigationBar}
                 <ScrollView>
                     {this.renderView()}
                 </ScrollView>
               </View>
    }
    renderView(){
       if(!this.state.keys || this.state.keys.length === 0){
           return null
       }
       let len = this.state.keys.length
       let views = []
       for(let i=0;i<len-2;i+=2){
        views.push(
            <View key={i} style={styles.item}>
              {this.renderCheckBox(this.state.keys[i])}
              {this.renderCheckBox(this.state.keys[i+1])}
            </View>
        )
       }
       views.push(
        <View key={len-1} style={styles.item}>
            {len % 2 === 0 ? this.renderCheckBox(this.state.keys[len-2]):null}
            {this.renderCheckBox(this.state.keys[len-1])}
        </View>
       )
       return views
    }
    renderCheckBox(data){
      return(
        <CheckBox 
          style={styles.checkbox}
          onClick={()=>{this.onClick(data)}}
          leftText={data.name}
          isChecked={data.checked}
          checkedImage={<Image source={require('./img/ic_check_box.png')}
          style={{tintColor:'#6495ED'}}/>}
          unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')}
          style={{tintColor:'#6495ED'}}/>}
        />
      )
    }
    onClick(data){
        data.checked=!data.checked
        ArrayUtils.updateArray(this.changeValues,data)
    }
    loadData(){
        this.LanguageDao.fetch()
            .then(res =>{
                console.log(res)
               this.setState({
                   keys:res
               })
            })
            .catch(error => {
                console.log(error)
            })
    }
    onSave(navigation){
        if(this.changeValues.length === 0){
            NavigatorUtil.goBack(navigation)
            return
        }
        this.save(this.state.keys)
        NavigatorUtil.goBack(navigation)
    }
    goBack(navigation){
        if(this.changeValues.length === 0){
            NavigatorUtil.goBack(navigation)
            return
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text:'不保存',onPress:()=>{NavigatorUtil.goBack(navigation)}},
                {text:'保存',onPress:()=>{this.onSave(navigation)}}
            ]
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item:{
        flexDirection:'row',
        alignItems:'center'
    },
    checkbox:{
        // flex:1,
        flexDirection:'row',
        width:(deviceWidth-20)/2,
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.5,
        borderRadius:2,
        borderColor:'#dddddd',
        shadowColor:'gray', // ios
        shadowOffset:{width:0.5,hight:0.5},// ios
        shadowOpacity:0.4,// ios
        shadowRadius:1,// ios
        elevation:2 // android
    }
});
