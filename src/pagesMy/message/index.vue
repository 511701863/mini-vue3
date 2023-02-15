<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
const list = [
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg1.png',
  title:'服务消息',
  routeName:'messageService',
  msg:'等了那么久终于要登场，见证凯翼网红等了那么久终于要登场，见证凯翼网红',
  info:122,
  time:'05月30日'
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg2.png',
  title:'故障提醒',
  routeName:'messageFailure',
  info:0,
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg3.png',
  title:'告警提醒',
  routeName:'messageWarning',
  info:0,
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg4.png',
  title:'保养提醒',
  routeName:'messageMaintain',
  info:8,
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg5.png',
  title:'通知消息',
  routeName:'messageNotice',
  info:0,
  msg:'小熊是谁加入凯翼炫界改装俱乐部',
  time:'05月30日'
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg6.png',
  title:'流量提醒',
  routeName:'messageFlow',
  info:0,
  msg:'',
  time:''
  }
];
</script>

<template>
  <div class="relative">
    <div v-for="(item,index) in list" :key="index">
      <div class=" bg-white p-32rpx flex justify-between items-center" @click="router.navigateTo({name:item.routeName as any})">
        <div class="relative">
          <nxImage
            :src="item.src"
            width="96rpx"
            height="96rpx"
          />
          <div v-if="item.info" class="dot">
            {{ item.info > 99?'99+':item.info }}
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
.dot{
  background-color: #DF3720;
  color: #fff;
  font-size: 18rpx;
  text-align: center;
  position: absolute;
  top:-10rpx;
  right:-10rpx;
  border-radius: 50%;
  text-align: center;
  padding:5rpx 10rpx 5rpx 10rpx;
}
</style>
