
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import GlobalStyles from '../../res/styles/GlobalStyles'
import {I18n} from '../../language/i18n'
export default class TrendingCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderContributors(contributors){
       if(contributors.length === 0)return null
       let items = []
       contributors.forEach((item,index) => {
        items.push(
            <Image 
                key={index}
                style={{height:25,width:25,borderRadius:5,marginLeft:5}}
                source={{uri:item}}
            />
        )
       })
       return items
    }

    render() {
        const data = this.props.data
        const language = data.language ? <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={{marginRight:5,fontSize:12}}>{data.language}</Text>
                                            <View style={{width:12,height:12,borderRadius:50,backgroundColor:data.languageColor}}></View>
                                        </View>
                                        : null
        const description='<p>'+data.description+'</p>'
        return (
             <TouchableOpacity
                onPress={this.props.onSelect}
             >
                <View style={GlobalStyles.cell_container}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>{data.fullName}</Text>
                            {language}
                        </View>
                        <HTMLView
                            value={description}
                            onLinkPress={(url) => {
                            }}
                            stylesheet={{
                                p:styles.description,
                                a:styles.description
                            }}
                        />
                        {
                        data.contributors.length === 0 ? null : 
                            <View style={{flexDirection:'row',marginBottom:5,alignItems:'center'}}>
                                <Text>{I18n.t('trending.built_by_title')}</Text>
                                {this.renderContributors(data.contributors)}
                            </View>
                        }
                        <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                            <Text style={{fontSize:12}}>{data.starCount}</Text>
                            <Text style={{fontSize:12}}>{data.forkCount}</Text>
                            <Text style={{fontSize:12}}>{data.meta}</Text>
                        </View>
                    </View>
                </View>
             </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    title: {
        flex:1,
        fontSize: 16,
        marginBottom: 5,
        color: '#2196F3'
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
        color: '#212121'
    }
})
