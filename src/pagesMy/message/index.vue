<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

import dayjs from 'dayjs';
import { latestMessage, unreadMessage, clearUnreadMessage } from '@/api/my/message';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const { run: latestMessageFn, data: lastMsgData } = useRequest(latestMessage, {
  manual: true,
  onSuccess: () => {
    for (const key in lastMsgData.value) {
      list.value.find((item) => {
      if (item.msgModel === key) {
        item.msg = lastMsgData.value[key].content;
        item.time = dayjs(lastMsgData.value[key].actualSendTime).format('MM月DD日');
      }
    });
    }
  }
});
const { run: unreadMessageFn, data: infoData } = useRequest<Message.AppUnReadMsgRecordEntity>(unreadMessage, {
  manual: true,
  onSuccess: () => {
    console.log(lastMsgData);
  }
});
const { run: clearUnreadMessageFn} = useRequest(clearUnreadMessage, {
  manual: true
});
onShow(() => {
  latestMessageFn();
  unreadMessageFn();
});
const router = useRouter();
const list = ref([
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg1.png',
    title: '服务消息',
    routeName: 'messageService',
    msg: '',
    info: infoData.value?.systemCount,
    msgModel: 'SYSTEM',
    time: ''
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg2.png',
    title: '故障提醒',
    routeName: 'messageFailure',
    info: infoData.value?.malfunctionRemindCount,
    msg: '',
    msgModel: 'MALFUNCTION_REMIND',
    time: ''
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg3.png',
    title: '告警提醒',
    routeName: 'messageWarning',
    info: infoData.value?.warningRemindCount,
    msg: '',
    msgModel: 'WARNING_REMIND',
    time: ''
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg4.png',
    title: '保养提醒',
    routeName: 'messageMaintain',
    info: infoData.value?.maintainRemindCount,
    msg: '',
    msgModel: 'MAINTAIN_REMIND',
    time: ''
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg5.png',
    title: '通知消息',
    routeName: 'messageNotice',
    info: infoData.value?.noticeCount,
    msg: '',
    msgModel: 'NOTICE',
    time: ''
  },
  {
    src: 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg6.png',
    title: '流量提醒',
    routeName: 'messageFlow',
    info: infoData.value?.mobileDataRemindCount,
    msg: '',
    msgModel: 'MOBILE_DATA_REMIND',
    time: ''
  }
]);
function goToList(item:any){
  clearUnreadMessageFn({msgModel:item.msgModel});
  router.navigateTo({ name: item.routeName as any, query:{msgModel:item.msgModel} });
}
</script>

<template>
  <div class="relative">
    <div v-for="(item, index) in list" :key="index">
      <div
        class=" bg-white p-32rpx flex justify-between items-center"
        @click="goToList(item)"
      >
        <div class="relative">
          <nxImage :src="item.src" width="96rpx" height="96rpx" />
          <div v-if="item.info" class="dot">
            {{ item.info > 99 ? '99+' : item.info }}
          </div>
        </div>
        <div class="flex-1 ml-32rpx">
          <div class="flex justify-between">
            <div class="font-bold">
              {{ item.title }}
            </div>
            <div v-if="item.time" class="text-titleSmall text-gray">
              {{ item.time }}
            </div>
          </div>
          <p class="text-titleMedium text-gray mt-10rpx truncate w-550rpx">
            {{ item.msg || '暂无消息' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dot {
  background-color: #DF3720;
  color: #fff;
  font-size: 18rpx;
  text-align: center;
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  border-radius: 50%;
  text-align: center;
  padding: 5rpx 10rpx 5rpx 10rpx;
}
</style>
