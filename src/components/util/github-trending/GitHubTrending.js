/**
 * 从https://github.com/trending获取数据
 * 项目地址:
 * 
 * @flow
 */
import TrendingUtil from './TrendingUtil';

export default class GitHubTrending {
  GitHubTrending(){//Singleton pattern
    if (typeof GitHubTrending.instance==='object') {
      return GitHubTrending.instance;
    }
    GitHubTrending.instance=this;
  }
  fetchTrending(url){
    return new Promise((resolve,reject)=>{
      fetch(url)
      .then((response)=>response.text())
      .catch((error)=>{
        reject(error);
      }).then((responseData)=>{
        try {
          resolve(TrendingUtil.htmlToRepo(responseData));
        } catch (e) {
          reject(e);
        }
      }).done();
    });
  }



}
