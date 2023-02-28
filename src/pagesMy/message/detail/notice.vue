<script setup lang="ts">
import { ref, reactive, Ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

import dayjs from 'dayjs';
import { listAppMessage, deleteMessage } from '@/api/my/message';
import { useRouter } from '@/router/router';
import { useRequest } from '../../../hooks/useRequest/useRequst';

const router = useRouter();
const scrollRef:any = ref(null);
const modelCode:any = ref('');
const { run: deleteMessageFn} = useRequest(deleteMessage, {
  manual: true,
  onSuccess: () => {
    scrollRef.value.search();
  }
});
onLoad((query) => {
  const { msgModel } = query;
  modelCode.value = msgModel;
});
onMounted(() => {
  scrollRef.value.search();
});
function deleteFn(id:any){
  uni.showModal({
    title: '确认删除',
    content: '电子围栏删除后，将不在该区域对车辆进行监控。请确认是否继续？',
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        deleteMessageFn([id]);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }});
}
</script>

<template>
  <div class="relative">
    <nxScrollView ref="scrollRef" :msg-data="true" :cb-fn="listAppMessage" :params="{msgModel:modelCode}" :manual="true">
      <template #list="{ list }">
        <div v-for="(item,index) in list as Message.MessageInfoAo[]" :key="index">
          <van-swipe-cell :right-width="64">
            <div slot="right" class="text-white flex items-center justify-center w-128rpx h-100% bg-pageBg">
              <div @click="deleteFn(item.recordId)">
                <nx-image
                  src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/delete_icon.png"
                  width="96rpx"
                  height="96rpx"
                />
              </div>
            </div>
            <div class="p-y-32rpx p-x-64rpx bg-white">
              <div class="text-center text-lightGrayText text-titleSmall">
                {{ dayjs(item.actualSendTime).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
              <div class="text-titleLarge font-bold mt-24rpx">
                {{ item.title }}
              </div>
              <div class="text-lightGrayText text-26rpx mt-8rpx">
                {{ item.content }}
              </div>
              <div v-if="item.msgBizType === 'ACCREDIT_REMIND'" class="flex flex-between text-26rpx mt-24rpx">
                <div></div>
                <div @click="router.navigateTo({name:'carManagement'})">
                  查看授权车辆<van-icon name="arrow" />
                </div>
              </div>
            </div>
          </van-swipe-cell>
        </div>
      </template>
    </nxScrollView>
  </div>
</template>
<style scoped lang="scss">
.map {
  width: 750rpx;
  height: 100vh;
}
</style>
