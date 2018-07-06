import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ScrollView
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'
import CheckBox from 'react-native-check-box'
import {I18n} from '../../../language/i18n'
import ViewUtils from '../../util/ViewUtils'
import NavigatorUtil from '../../util/NavigatorUtil'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

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
                rightButton={ViewUtils.getRightButton(I18n.t('my.custom_key_save_text'),()=>this.onSave())}
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
          checkedImage={<Image source={require('./img/ic_check_box.png')}
          style={{tintColor:'#6495ED'}}/>}
          unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')}
          style={{tintColor:'#6495ED'}}/>}
        />
      )
    }
    onClick(data){
        data.checked=!data.checked
        this.changeValues.forEach((item,index)=>{
            let temp = item
            if(temp === data){
                this.changeValues.splice(index,1)
                return
            }
        })
        this.changeValues.push(data)
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
    goBack(navigation){
        NavigatorUtil.goBack(navigation)
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
        flex:1,
        flexDirection:'row',
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
