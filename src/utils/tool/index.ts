import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime);

// ts动态获取本地img，解决vite.alias引入图片打包不显示问题
export function getLocalImg(fileName: string) {
  const path = `/src/static/images/${fileName}`;
  const modules = import.meta.globEager('/src/static/images/*');
  return modules[path]?.default;
}

export function getQDTracker(){
  const modules = import.meta.globEager('/src/utils/QDTracker/QDTracker.js');
  return modules;
}

export function deepClone <T = any>(origin: T, target?: Record<string, any> | T ): T {
  const isArr = (origin: any): boolean => {
    const str = '[object Array]';
    return Object.prototype.toString.call(origin) === str;
  };

  const tar = target || {};

  for (const key in origin) {
      if (Object.prototype.hasOwnProperty.call(origin, key)) {
          if (typeof origin[key] === 'object' && origin[key] !== null) {
              tar[key] = isArr(origin[key]) ? [] : {};
              deepClone(origin[key], tar[key]);
          } else {
              tar[key] = origin[key];
          }
      }
  }

  return tar as T;
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(func: Function, time: number, immediate = false) {
  if (immediate) {
      let prevTime = 0;
      return (...args: any) => {
          const nowTime = Date.now();
          if (nowTime - prevTime >= time) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              func.apply(this, args);
              prevTime = nowTime;
          }
      };
  } else {
      let timer: NodeJS.Timeout | null = null;
      return (...args: any) => {
          if (!timer) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              func.apply(this, args);
              timer = setTimeout(() => {
                  if (timer) {
                    clearInterval(timer);
                  }
                  timer = null;
              }, time);
          }
      };
  }

}
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, time: number, immediate = false) {
  let timer: NodeJS.Timeout | null = null;
  return (...args: any) => {
      if (timer) {
        clearInterval(timer);
      }
      if (immediate) {
          if (!timer) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            func.apply(this, args);
          }
          timer = setTimeout(() => {
              timer = null;
          }, time);
      } else {
          timer = setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              func.apply(this, args);
          }, time);
      }
  };
}

export function timeFromNow(time: dayjs.ConfigType) {
  let result = time;
  if(time){
    if(dayjs().isSame(time, 'date')){
      result = dayjs(time).locale('zh-cn').fromNow();
    } else if(dayjs().isSame(time, 'year')){
      result = dayjs(time).format('MM-DD');
    } else {
      result = dayjs(time).format('YYYY-MM-DD');
    }
  }
  return result;
}
// 转数字
export function toNumber(price: number | string | undefined) {
  return parseInt(price as string) || 0;
}

//去重
export function uniqueFunc(arr:any[], uniId:any){
  const hash = {};
  return arr.reduce((accum, item) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-unused-expressions
    hash[item[uniId]] ? '' : hash[item[uniId]] = true && accum.push(item);
    return accum;
  }, []);
}

