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
        return(
            <ScrollView style={{backgroundColor: 'white', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('CustomKeyPage')}>
                        <View>
                            <Text>ssssss</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

})