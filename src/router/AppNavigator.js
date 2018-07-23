import {createStackNavigator} from 'react-navigation'
import HomeNavigator from './HomeNavigator'
import WelcomePage from '../components/page/WelcomePage'
import PopularPage from '../components/page/popular/PopularPage'
import HomePage from '../components/page/home/HomePage'
import LoginPage from '../components/page/login/LoginPage'
import CustomThemePage from '../components/page/my/CustomThemePage'


export const AppNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    },
    LoginPage: {
        screen: LoginPage
    },
    HomeNavigator: {
        screen: HomeNavigator
    },
    CustomThemePage: {
        screen: CustomThemePage
    }
}, {
    navigationOptions: {
        header: null
    }
})



