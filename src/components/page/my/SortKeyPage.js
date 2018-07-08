/**
 * Created by wangjh on 2018/6/26.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity,
    Button,
    TouchableHighlight,
    Alert
} from 'react-native'
import SortableListview from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import ArrayUtils from '../../util/ArrayUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ViewUtils from '../../util/ViewUtils'
import NavigatorUtil from '../../util/NavigatorUtil'
import GlobalStyles from '../../../res/styles/GlobalStyles'

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [] // 从数据库读取的所有数据
        this.sortResultArray = [] // 排序之后的数据
        this.originalCheckedArray = [] // 上一次标签初始化的顺序
        this.state = {
          checkedArray : [] // 选择的数据
        }
    }
    componentDidMount(){
        this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
        this.loadData()
    }
    loadData(){
        this.LanguageDao.fetch()
            .then(result =>{
              this.getCheckedItems(result)
            })
            .catch(err =>{

            })
    }
    getCheckedItems(result){
      this.dataArray = result
      let checkedArrray = []
      result.forEach((item,index) => {
          let data = item
          if(data.checked)checkedArrray.push(data)
      })
      this.setState({
          checkedArray:checkedArrray
      })
      this.originalCheckedArray = ArrayUtils.clone(checkedArrray)
    }
    goBack(navigation){
        // 相等说明没有排序直接返回
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
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
    onSave(navigation){
        // 相等说明没有排序直接返回
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            NavigatorUtil.goBack(navigation)
            return
        }
        this.getSortResult()
        this.LanguageDao.save(this.sortResultArray)
        NavigatorUtil.goBack(navigation)
    }
    getSortResult(){
        this.sortResultArray = ArrayUtils.clone(this.dataArray)
        for (let i = 0, j = this.originalCheckedArray.length; i < j; i++) {
            let item = this.originalCheckedArray[i]
            let index = this.dataArray.indexOf(item)
            this.sortResultArray.splice(index, 1, this.state.checkedArray[i])
        }
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
                title={I18n.t('my.sort_key_title')}
                statusBar={statusBar}
                leftButton={ViewUtils.getLeftButton(()=>this.goBack(navigation))}
                rightButton={ViewUtils.getRightButton(I18n.t('my.sort_key_save_text'),()=>this.onSave(navigation))}
            />;
        return <View style={styles.container}>
            {navigationBar}
            <SortableListview 
               style={{flex:1}}
               data={this.state.checkedArray}
               order={Object.keys(this.state.checkedArray)}
               onRowMoved={e=>{
                this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                this.forceUpdate()
               }}
               renderRow={row=> <SortCell data={row} />}
            />
          </View>
    }
}
class SortCell extends Component{
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={10} // 触碰滑动速度
            style={GlobalStyles.cell_container}
            {...this.props.sortHandlers}
           >
            <View style={styles.row}>
                <Image source={require('./img/ic_sort.png')} 
                       style={styles.image}
                />
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item:{
        padding:15,
        backgroundColor:'#F8F8F8',
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
    },
    image:{
        tintColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10
    }
})