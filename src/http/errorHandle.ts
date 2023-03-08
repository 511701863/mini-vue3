import {Result} from './types';

const obj:any = {
  default: function(msg:string) {
    uni.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
  },
  '12030':function(msg:string) {
    uni.showToast({
      title: '账号未注册，请前往凯翼club注册账号',
      icon: 'none',
      duration: 3000
    });
  },
  '-10014': function(msg:string) {
    uni.showToast({
      title: '登录超时，请重新登录',
      icon: 'none',
      duration: 2000
    });
  },
  401: function(msg:string) {
    uni.showToast({
      title: '登录过期',
      icon: 'error',
      duration: 2000
    });
    setTimeout(() => {
      uni.navigateTo({url:'/pages/common/login/index'});
    }, 1000);
  }
};

export default function(res:Result) {
    if (Object.prototype.hasOwnProperty.call(obj, res.code ?? res.statusCode)) {
    obj[res.code ?? res.statusCode](res.msg || res.errMsg);
    return;
  }
  obj.default(res.msg || res.errMsg || '请求失败');
}
