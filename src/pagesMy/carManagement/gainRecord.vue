<script setup lang="ts">
import { ref, reactive, Ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

import type { RecordHistory } from '@/api/types/carConfigType';

import dayjs from 'dayjs';
import { recordHistory } from '@/api/my/carManagement';

const scrollRef:any = ref(null);

const params = reactive({
  vin:'',
  modelName:'',
  imgUrl:'',
  userId:uni.getStorageSync('userInfo').userId,
  carLicense:''
});
onLoad((query) => {
  const { vin, name, carLicense, imgUrl } = query;
  params.vin = vin ?? '';
  params.modelName = name ?? '';
  params.carLicense = carLicense ?? '';
  params.imgUrl = imgUrl ?? '';
});
onMounted(() => {
  scrollRef.value.search();
});
</script>

<template>
  <div class="relative">
    <div class="p-32rpx flex items-start bg-pageBg h-200rpx box-border">
      <div>
        <image class="w-320rpx h-128rpx" :src="params.imgUrl" />
      </div>
      <div class="text-grayText ml-12rpx">
        <div class="text-titleMedium font-bold lh-46rpx">
          {{ params.modelName }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          车牌号：{{ params.carLicense }}
        </div>
        <div class="text-titleSmall lh-46rpx">
          VIN：{{ params.vin }}
        </div>
      </div>
    </div>
    <nxScrollView ref="scrollRef" :cb-fn="recordHistory" :header-height="200" :params="{pageSize:5,vin:params.vin,userId:params.userId}" :manual="true">
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item,index) in list as RecordHistory[]" :key="index">
            <div class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border">
              <div class="w-622rpx flex justify-between p-y-18rpx text-medium border-b-1rpx border-gray-300">
                <div class="text-gray-400">
                  {{ dayjs(item.controlTime).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
                <div :class="item.controlResult === 'SUCCESS'?'text-success': item.controlResult === 'TIMEOUT'?'text-warn':'text-red'">
                  {{ item.controlResult === 'SUCCESS' ? '操作成功':item.controlResult === 'TIMEOUT'?"操作超时":"操作失败" }}
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-12rpx text-titleMedium">
                <div class="text-grayText">
                  操作内容
                </div>
                <div>
                  {{ item.controlFunctionStr }}
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-12rpx text-titleMedium">
                <div class="text-grayText">
                  操作账号
                </div>
                <div>
                  {{ item.userName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #noData>
        <div class="text-center mt-360rpx">
          <nx-image
            src="https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/no_data.png"
            width="360rpx"
            height="300rpx"
          />
          <div class="text-titleMedium text-grayText">
            暂无控车记录
          </div>
        </div>
      </template>
    </nxScrollView>
  </div>
</template>
<style scoped lang="scss">
</style>
