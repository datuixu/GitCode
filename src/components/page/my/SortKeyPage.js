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
    Button
} from 'react-native'
import SortableListview from 'react-native-sortable-listview'
import NavigationBar from '../../common/NavigationBar'
import {I18n} from '../../../language/i18n'
import ArrayUtils from '../../util/ArrayUtils'
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'

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
    render() {
        const {navigation} = this.props
        var statusBar = {
            backgroundColor: '#2196F3',
            barStyle: 'light-content',
            translucent: false
        }
        let navigationBar =
            <NavigationBar
                title={I18n.t('popular.title')}
                statusBar={statusBar}
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
               renderRow={row=> <SortCell data={row}/>}
            />
          </View>
    }
}
class SortCell extends Component{
    render(){
        return <View>
            <Text>{this.props.data.name}</Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})