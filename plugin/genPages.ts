// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import fs from 'fs';
import path from 'path';
import {pages, subPackages, tabBar} from '../src/router/routes/index';

export const pagesJson = {
  'pages': pages,
  'subPackages' : subPackages,
  'tabBar' : tabBar,
  'globalStyle': {
    'navigationBarTextStyle': 'black',
    'navigationBarTitleText': 'uni-app',
    'navigationBarBackgroundColor': '#F8F8F8',
    'backgroundColor': '#F8F8F8',
    'usingComponents': {
      'van-image': './wxcomponents/vant/image/index',
      'van-button': './wxcomponents/vant/button/index',
      'van-index-bar': './wxcomponents/vant/index-bar/index',
      'van-index-anchor': './wxcomponents/vant/index-anchor/index',
      'van-cell': './wxcomponents/vant/cell/index',
      'van-cell-group': './wxcomponents/vant/cell-group/index',
      'van-tab': './wxcomponents/vant/tab/index',
      'van-tabs': './wxcomponents/vant/tabs/index',
      'van-search': './wxcomponents/vant/search/index',
      'van-overlay': './wxcomponents/vant/overlay/index',
      'van-field': './wxcomponents/vant/field/index',
      'van-popup': './wxcomponents/vant/popup/index',
      'van-dialog': './wxcomponents/vant/dialog/index',
      'van-uploader': './wxcomponents/vant/uploader/index',
      'van-action-sheet': './wxcomponents/vant/action-sheet/index',
      'van-rate': './wxcomponents/vant/rate/index',
      'van-nav-bar': './wxcomponents/vant/nav-bar/index',
      'van-radio': './wxcomponents/vant/radio/index',
      'van-radio-group': './wxcomponents/vant/radio-group/index',
      'van-slider': './wxcomponents/vant/slider/index',
      'van-stepper': './wxcomponents/vant/stepper/index',
      'van-checkbox': './wxcomponents/vant/checkbox/index',
      'van-checkbox-group': './wxcomponents/vant/checkbox-group/index',
      'van-area':'./wxcomponents/vant/area/index',
      'van-tag':'./wxcomponents/vant/tag/index',
      'van-switch': './wxcomponents/vant/switch/index',
      'van-datetime-picker': './wxcomponents/vant/datetime-picker/index',
      'van-picker': './wxcomponents/vant/picker/index',
      'van-dropdown-menu': './wxcomponents/vant/dropdown-menu/index',
      'van-dropdown-item': './wxcomponents/vant/dropdown-item/index',
      'van-icon': './wxcomponents/vant/icon/index',
      'van-loading': './wxcomponents/vant/loading/index',
      'van-swipe-cell': './wxcomponents/vant/swipe-cell/index',
      'van-collapse': './wxcomponents/vant/collapse/index',
      'van-collapse-item': './wxcomponents/vant/collapse-item/index',
      'van-count-down': './wxcomponents/vant/count-down/index'
    }
  }
} as const;

function genPages(){
  fs.writeFile(path.resolve(__dirname, '../src/pages.json'), JSON.stringify(pagesJson), function(err){
    console.log(err);
  });
}

genPages();
