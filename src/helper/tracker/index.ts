import { appid, trackerkey, trackerHost } from '@/config';
import QDTracker from '@/utils/sdk/QDTracker/QDTracker.js';

export function QDinit() {
  try {
    QDTracker.init({
      appid,
      appkey: trackerkey,
      apiHost: trackerHost,
      useOpenId:false,
      apiMethod: 'post',
      encryptMode: 'close',
      autoTrack: {
        appLaunch: true,
        appShow: true,
        appHide: true,
        pageShow: true,
        pageHide: true,
        pageShare: true,
        share: true
      }
    });
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDLaunch(params: any) {
  try {
    QDTracker.track(
      '$MPPageShow',
      params
      // {
      //   content_id: id,
      //   section_id: '推荐位ID',
      //   recommendation: '推荐系统来源',
      //   strategy_id: '推荐策略ID',
      //   retrieve_id: '召回来源ID',
      //   weight: 1,
      //   module_sort: 2,
      //   request_id: '推荐接口请求ID'
      // }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDHide(params:any) {
  try {
    QDTracker.track(
      '$MPPageHide',
      params
      // {
      //   content_id: 1,
      //   section_id: '推荐位ID',
      //   recommendation: '推荐系统来源',
      //   strategy_id: '推荐策略ID',
      //   retrieve_id: '召回来源ID',
      //   weight: 1,
      //   module_sort: 2,
      //   request_id: '推荐接口请求ID'
      // }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDShare() {
  try {
    QDTracker.track(
      '$MPShare',
      {
        content_id: 2,
        section_id: '推荐位ID',
        recommendation: '推荐系统来源',
        strategy_id: '推荐策略ID',
        retrieve_id: '召回来源ID',
        weight: 1,
        module_sort: 2,
        request_id: '推荐接口请求ID'
      }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDSearch(query: string) {
  try {
    QDTracker.track(
      'search',
      {
        query
      }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDSearchResult(query: string) {
  try {
    QDTracker.track(
      'view_search_results',
      {
        content_id: 4,
        query
      }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}

export function QDClick(params:any) {
  try {
    QDTracker.track(
      'click',
      params
      // {
      //   content_id: 2,
      //   section_id: '推荐位ID',
      //   recommendation: '推荐系统来源',
      //   strategy_id: '推荐策略ID',
      //   retrieve_id: '召回来源ID',
      //   weight: 1,
      //   module_sort: 2,
      //   request_id: '推荐接口请求ID'
      // }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}
//曝光帖子
export function QDExposure(params:any) {
  try {
    QDTracker.track(
      'exposure',
      params
      // {
      //   content_id: id,
      //   section_id: '推荐位ID',
      //   recommendation: '推荐系统来源',
      //   strategy_id: '推荐策略ID',
      //   retrieve_id: '召回来源ID',
      //   weight: 1,
      //   module_sort: 2,
      //   request_id: '推荐接口请求ID'
      // }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}
//浏览帖子
export function QDPostView(id: number) {
  try {
    QDTracker.track(
      'post_view',
      {
        post_id: id,
        post_name: '测试浏览帖子'
      }
    );
    QDTracker.getIDs();
  } catch (e) {
    console.log('qidianDA_Error', e);
  }
}
