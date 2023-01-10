import {deepMerge, urlRegExp} from './helper';
import { ConfigType, InterceptorType, RequestOptions, Result, MethodType } from './types';

class Http {
  public config:ConfigType;
  public interceptor:InterceptorType;
  public get: MethodType;
  public post: MethodType;
  constructor(){
    this.config = {
      // 请求的根域名
			baseUrl: '',
			// 默认的请求头
			header: {},
			method: 'POST',
			// 设置为json，返回后wx.request会对数据进行一次JSON.parse
			dataType: 'json',
			// 此参数无需处理
			responseType: 'text',
			// 默认请求是否开启loading
			loading: true,
      loadingText: '请求中...',
      // 展示loading的时候，是否给一个透明的蒙层
      loadingMask: true
    };

    // 拦截器
		this.interceptor = {
			// 请求前的拦截
			request: null,
			// 请求后的拦截
			response: null
		};

    // get请求
		this.get = ( options:RequestOptions={url:'', params : {}, loading : this.config.loading, header : {}} ) => {
			return this.request({
				method: 'GET',
				url:options.url,
				header:options.header,
				params:options.params,
        loading:options.loading
			});
		};
    // post请求
    this.post = ( options:RequestOptions={url:'', params : {}, loading : this.config.loading, header : {}} ) => {
			return this.request({
				method: 'POST',
				url:options.url,
				header:options.header,
				params:options.params,
        loading:options.loading
			});
		};
  }
  // 设置全局默认配置
	setConfig( customConfig:Partial<ConfigType> ) {
		// 深度合并对象，否则会造成对象深层属性丢失
		this.config = deepMerge( this.config, customConfig );
	}
  request(options:RequestOptions){
    //是否设置请求拦截器
    if(this.interceptor.request && typeof this.interceptor.request === 'function'){
      const interceptorRequest = this.interceptor.request(options);
      //拦截器返回false
      if ( interceptorRequest === false ) {
				// 返回一个处于pending状态中的Promise，来取消原promise，避免进入.then
				return new Promise( ( ) => null );
			}
    }
    options.dataType ??= this.config.dataType;
		options.responseType ??= this.config.responseType;
		options.url ??= '';
		options.params ??= {};
		options.method ??= this.config.method;
		options.header = Object.assign( this.config.header, options.header );
    return new Promise( ( resolve, reject ) => {
      //小程序回调
			options.complete = ( response:Result ) => {
        response.loading = options.loading;
				// 判断是否存在拦截器
				if ( this.interceptor.response && typeof this.interceptor.response === 'function' ) {
					const resInterceptors = this.interceptor.response( response );
					// 如果拦截器不返回false，直接接入then回调
					if ( resInterceptors !== false ) {
						resolve( resInterceptors );
					} else {
						// 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
            // uni.showToast({
            //   title: '请求失败，请稍后再试',
            //   icon: 'none',
            //   duration: 2000
            // });
						reject( response.data || response );
					}
				} else {
					// 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
					resolve( response );
				}
			};
			// 判断用户传递的URL是否/开头,如果不是,加上/，
			options.url = urlRegExp(options.url) ? options.url : (this.config.baseUrl + (options.url.indexOf('/') === 0 ?
				options.url : '/' + options.url));

			uni.request( options as any );
		} );
  }
}

export default Http;
