/**
 * Created by wangjiahuan on 2018/6/29.
 */

import {
    AsyncStorage,
} from 'react-native';
// import Trending from "GitHubTrending";
export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending', flag_my: 'my'}

export default class DataRepository {
    constructor(flag) {
        this.flag = flag;
        // if (flag === FLAG_STORAGE.flag_trending)this.treding = new Trending();
    }

    saveRepository(url, items, callback) {
        if (!items || !url)return;
        let wrapData;
        if (this.flag === FLAG_STORAGE.flag_my) {
            wrapData = {item: items, update_date: new Date().getTime()};
        } else {
            wrapData = {items: items, update_date: new Date().getTime()};
        }
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
    }

    fetchRepository(url) {
        return new Promise((resolve, reject)=> {
            this.fetchLocalRepository(url).then((wrapData)=> {
                if (wrapData) {
                    resolve(wrapData, true);
                } else {
                    this.fetchNetRepository(url).then((data)=> {
                        resolve(data);
                    }).catch((error)=> {
                        reject(error);
                    })
                }

            }).catch((error)=> {
                this.fetchNetRepository(url).then((data)=> {
                    resolve(data);
                }).catch((error=> {
                    reject(error);
                }))
            })
        })
    }

    fetchLocalRepository(url) {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(url, (error, result)=> {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject)=> {
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
        })
    }
}