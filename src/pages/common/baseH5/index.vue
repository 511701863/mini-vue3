<script setup lang="ts">
import { onLoad, onShareAppMessage} from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useConfig } from '../../../store/modules/config';

const {getBaseH5} = useConfig();

let cookie = uni.getStorageSync('COOKIE');
let userId = uni.getStorageSync('userId');

cookie = encodeURIComponent(cookie);
let activityId = ref('');
let src = ref('');
let isHelp = false;
const onMessage = (e: any) => {
  console.log(e.detail);
  const data = (e.detail.data || []).pop();
  if(data && data.type === 'disableAlertBeforeUnload'){
    uni.disableAlertBeforeUnload();
  }
  if(data && data.type === 'inviteFriend'){
    isHelp = true;
  }
};
onShareAppMessage((shareOpt) => {
  console.log('分享', shareOpt);
  const promise = new Promise((resolve, rej) => {
    console.log(111);
  });
  return {
    promise,
    title: '快来和我一起参与活动吧',
    path: `/pagesFind/activity/activityCommonDetail?activityId=${activityId.value}&shareUserId=${userId}`
  };
});
onLoad((e: any) => {
  const { path, ...query } = e;
  src.value = getBaseH5() + path + '?';
  activityId.value = query.activityId || '';
  for (let key in query) {
    src.value += key + '=' + query[key] + '&';
  }

  // src.value += 'cookie' + '=' + cookie;
});
</script>

<template>
  <view v-if="src">
    <web-view :src="src" @message="onMessage" />
  </view>
</template>
