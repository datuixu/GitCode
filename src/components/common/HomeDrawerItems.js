import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

export default class DrawerItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        const {navigation} = this.props
        console.log(navigation)
        return(
            <ScrollView style={{backgroundColor: 'white', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('CustomKeyPage',{isRemoveKey:false})}>
                        <View>
                            <Text>自定义标签</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('SortKeyPage')}>
                        <View>
                            <Text>标签排序</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('CustomKeyPage',{isRemoveKey:true})}>
                        <View>
                            <Text>标签移除</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('CustomThemePage')}>
                        <View>
                            <Text>个性主题</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

})