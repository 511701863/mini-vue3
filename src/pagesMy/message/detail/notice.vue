<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();
const list = [
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg1.png',
  title:'服务消息',
  routeName:'',
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg2.png',
  title:'故障提醒',
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg3.png',
  title:'告警提醒',
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg4.png',
  title:'保养提醒',
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg5.png',
  title:'通知消息',
  msg:'',
  time:''
  },
  {
  src:'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/msg6.png',
  title:'流量提醒',
  msg:'',
  time:''
  }
];
const active = ref(0);
</script>

<template>
  <div class="relative">
    <div class="p-32rpx">
      <div v-for="(item,index) in list" :key="index">
        <div class=" bg-white p-32rpx flex justify-between">
          <div>
            <nx-image
              :src="item.src"
              width="96rpx"
              height="96rpx"
            />
          </div>
          <div class="flex-1 ml-32rpx">
            <div>
              <div class="font-bold">
                {{ item.title }}
              </div>
              <div v-if="item.time" class="text-titleSmall text-gray">
                {{ item.time }}
              </div>
            </div>
            <p class="text-titleMedium text-gray">
              {{ item.msg || '暂无消息' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
</style>
