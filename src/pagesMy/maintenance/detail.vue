<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import AlertDialog from './components/alertDialog.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';

const router = useRouter();

const params:any = ref({});
onLoad((e) => {
  params.value = e.item;
});
const showDialog = ref(false);
function getType (type:any){
  console.log(type);

}
</script>

<template>
  <div class="p-32rpx bg-pageBg">
    <div class="w-686rpx mb-32rpx rounded-16rpx p-y-14rpx box-border">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex">
            <div :class="params.modelName === '轩度26553'?'bg-buttonColor':'bg-buttonColorBlue'" class="color-white w-96rpx mr-32rpx text-center rounded-8rpx lh-44rpx">
              {{ '保养' }}
            </div>
            <div class="font-bold">
              川A·88888
            </div>
          </div>
          <div class="text-gray mt-14rpx text-medium">
            {{ '预约日期：2022年08月12日13:0' }}
          </div>
        </div>
        <nx-image
          :src="params.modelName === '轩度26553'?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_cancel.png':'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_down.png'"
          width="150rpx"
          height="150rpx"
        />
      </div>
    </div>
    <div class="flex justify-between items-center bg-white mt-26rpx p-y-48rpx p-x-32rpx rounded-16rpx">
      <div>
        <div class="font-bold">
          成都中宏通车业有限公司
        </div>
        <div class="text-gray mt-14rpx text-medium">
          {{ '成都市锦江区锦江大道1947号' }}
        </div>
      </div>
      <nx-image
        :src="params.modelName === '轩度26553'?'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_cancel.png':'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/call_phone.png'"
        width="72rpx"
        height="72rpx"
      />
    </div>
    <div class="flex justify-between items-center bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        姓名
      </div>
      <div class="text-gray">
        {{ '成都市锦江区' }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        手机号
      </div>
      <div class="text-gray">
        {{ '18912340001' }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        维保单号
      </div>
      <div class="text-gray">
        {{ 'COWIN20200199892202' }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        提交时间
      </div>
      <div class="text-gray">
        {{ '2022年07月09日14:24:25' }}
      </div>
    </div>
    <div class="bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        预约说明
      </div>
      <div class="text-gray mt-16rpx">
        {{ '成都市锦江区' }}
      </div>
    </div>
    <div class="bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        提示
      </div>
      <div class="text-gray mt-16rpx">
        {{ '您的维保预约已被确定，请在预约日期前往4' }}
      </div>
    </div>
    <div>
      <div class="font-bold m-y-48rpx">
        维保详情
      </div>
      <div class="flex justify-between items-center bg-white mt-26rpx p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          公里数
        </div>
        <div class="text-gray">
          {{ '成都市锦江区' }}
        </div>
      </div>
      <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          项目
        </div>
        <div class="text-gray">
          {{ '18912340001' }}
        </div>
      </div>
      <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          材料
        </div>
        <div class="text-gray">
          {{ '某某牌机油 水某牌玻璃某牌玻璃水某某牌玻' }}
        </div>
      </div>
    </div>
    <button
      class="bg-white h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
      @click="showDialog=true"
    >
      取消预约
    </button>
    <AlertDialog v-model="showDialog" />
  </div>
</template>
<style scoped lang="scss">
</style>
