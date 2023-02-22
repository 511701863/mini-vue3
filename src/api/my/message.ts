import { post, get, deleteFn } from '@/http/index';

//查询用户未读消息数
export function unreadMessage<P = any>(data: P) {
  return get<Message.AppUnReadMsgRecordEntity>({
    url: '/tsp-msg-core/appManager/unreadMessage',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//分页获取消息
export function listAppMessage<P = any>(data: P) {
  return post<Message.MessageInfoAo[]>({
    url: '/tsp-msg-core/appManager/listAppMessage',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//查询用户未读消息数
export function latestMessage<P = any>() {
  return get<any>({
    url: '/tsp-msg-core/appManager/latestMessage',
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//清除未读消息数
export function clearUnreadMessage<P = any>(data: P) {
  return post<any>({
    url: '/tsp-msg-core/appManager/clearUnreadMessage',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//删除消息
export function deleteMessage<P = any>(data: P) {
  return deleteFn<any>({
    url: '/tsp-msg-core/appManager/messageDelete',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
