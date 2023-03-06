<script setup lang="ts">
import { ref, reactive, Ref, computed, onMounted } from 'vue';
import { onLoad, onTabItemTap } from '@dcloudio/uni-app';

import PinInput from '@/components/pinInput/myp-one.vue';

import type { GrantRecordVo } from '@/api/types/carConfigType';

import dayjs from 'dayjs';
import { useRouter } from '@/router/router';
import { findRemoteGrantRecords, revokeGrant } from '@/api/my/carManagement';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';
import { useConfig } from '../../store/modules/config';

const { run: revokeGrantFn, data: formData } = useRequest<any, any>(revokeGrant, {
  manual: true,
  onSuccess:() => {
    uni.showToast({
      title:'操作成功',
      icon:'none'
    });
  scrollRef.value.search();
  }
});
const router = useRouter();
const { setPin, config } = useConfig();
const scrollRef: any = ref(null);

const params = reactive({
  vin: '',
  modelName: '',
  imgUrl: '',
  carLicense: ''
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
function cancelAuth(item:any) {
  uni.showModal({
    title: '撤销授权',
    content: `确认撤销车辆${item.carLicense}给${item.gainUserPhone}的授权? 撤销后被授权人将失去对车辆的控制权，撤销前请确认被分享人用车安全。注:撤销车辆授权，同时也会撤销蓝牙钥匙的分享`,
    confirmColor: '#FF933B',
    success: function (res) {
      if (res.confirm) {
        setPin(true, 0, revokeGrantFn, item.id);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
const active = ref(0);
</script>

<template>
  <div class="relative">
    <div class="p-32rpx flex items-start bg-pageBg h-200rpx box-border">
      <div>
        <image class="w-320rpx h-148rpx" :src="params.imgUrl" />
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
    <nxScrollView
      ref="scrollRef"
      :cb-fn="findRemoteGrantRecords"
      :header-height="200"
      :params="{ pageSize: 5, vin: params.vin }"
      :is-lower-bottom="false"
      :manual="true"
    >
      <template #list="{ list }">
        <div class="p-32rpx">
          <div v-for="(item, index) in list as GrantRecordVo[]" :key="index">
            <div class="mb-32rpx relative w-686rpx bg-white rounded-16rpx p-32rpx box-border">
              <div class="flex justify-between">
                <div class="flex">
                  <div class="font-bold">
                    授权信息
                  </div>
                  <nx-image
                    class="ml-8rpx"
                    :src="item?.grantStatus === 1 ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUsing.png' : item?.grantStatus === 0 ? 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseEnd.png' : 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/carUseBack.png'"
                    width="120rpx"
                    height="48rpx"
                  />
                </div>
                <div @click="router.navigateTo({ name: 'carManagementRecord', query:{id:item.id, vin:item.vin, name:item.modelShowName, carLicense:item.carLicense, imgUrl:item.modelImage,gainUserId:item?.gainUserId} })">
                  控车记录<van-icon name="arrow" />
                </div>
              </div>
              <div class="flex justify-between items-center p-y-48rpx">
                <div class="text-center">
                  <p class="text-46rpx font-bold">
                    {{ dayjs(item?.grantStartTime).format('MM月DD日') }}
                  </p>
                  <p class="text-titleSmall text-lightGrayText">
                    {{ dayjs(item?.grantStartTime).format('HH:mm') }}
                  </p>
                </div>
                <div class="border-lightGray border-b-4rpx w-68rpx relative arrow-right">
                </div>
                <div class="text-center">
                  <p class="text-46rpx font-bold">
                    {{ dayjs(item?.grantEndTime).format('MM月DD日') }}
                  </p>
                  <p class="text-titleSmall text-lightGrayText">
                    {{ dayjs(item?.grantEndTime).format('HH:mm') }}
                  </p>
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  被授权账号
                </div>
                <div class="text-lightGrayText">
                  {{ item?.gainUserPhone }}
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  被授权人姓名
                </div>
                <div class="text-lightGrayText">
                  {{ item?.gainUserName }}
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  授权钥匙
                </div>
                <div class="text-lightGrayText">
                  {{ item?.grantType === 0?'网络钥匙，蓝牙钥匙':'网络钥匙' }}
                </div>
              </div>
              <div class="w-622rpx flex justify-between p-y-32rpx">
                <div>
                  授权时间
                </div>
                <div class="text-lightGrayText">
                  {{ dayjs(item?.createTime).format('YYYY年MM月DD日 HH:mm') }}
                </div>
              </div>
              <button v-if="item?.grantStatus === 1" class="button-white lh-64rpx h-72rpx" @click="cancelAuth(item)">
                撤销授权
              </button>
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
            暂无授权记录
          </div>
        </div>
      </template>
    </nxScrollView>
    <PinInput type="box" />
  </div>
</template>
<style scoped lang="scss">
.arrow-right::after {
  display: block;
  content: '';
  position: absolute;
  right: 0;
  bottom: 3rpx;
  transform: rotate(60deg);
  height: 4rpx;
  width: 10rpx;
  background-color: #EEEEEE;
}
</style>
