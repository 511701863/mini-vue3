<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import AlertDialog from './components/alertDialog.vue';
import nxImage from '@/components/nxImage/nxImage.vue';

import { getMaintenanceDetail, getMaintenanceDelete } from '@/api/my/maintenance';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import dayjs from 'dayjs';

const router = useRouter();
const imgList: Record<any, string> = {
  '1': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_pending.png',
  '2': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_prepare.png',
  '3': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_cancel.png',
  '4': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_down.png',
  '5': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_timeOut.png',
  '-1': 'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/m_failure.png'
};
const { run: getMaintenanceDetailFn, data: mainDetail } = useRequest<MyCenter.MaintenanceAppointmentDetailAo>(getMaintenanceDetail, {
  manual: true
});
const { run: getMaintenanceDeleteFn } = useRequest(getMaintenanceDelete, {
  manual: true,
  onSuccess: () => {
    router.navigateBack({});
  }
});
onLoad((e: any) => {
  const { id } = e;
  getMaintenanceDetailFn({ id });
});
const params: any = ref({});
onLoad((e) => {
  params.value = e.item;
});
const showDialog = ref(false);
function deleteFn() {
  uni.showModal({
    title: '删除订单',
    content: '尊敬的车主，维保订单一经删除将无法再检索查看，请确认是否删除？',
    success: function (res) {
      if (res.confirm) {
        getMaintenanceDeleteFn({ id: mainDetail.value?.id });
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}
function call(phone: any) {
  uni.makePhoneCall({
    phoneNumber: phone,
    success: function () {
      console.log('拨打电话成功');
    },
    fail() {
      console.log('打电话失败了');
    }
  });
}
function openEnjoy() {
  wx.openLocation({
    latitude: mainDetail?.value?.latitude?+mainDetail.value.latitude:0,
    longitude: mainDetail?.value?.longitude?+mainDetail.value.longitude:0,
    address: mainDetail?.value?.detailAddress,
    name: mainDetail?.value?.salesAreaName,
    scale: 18
  });
}
</script>

<template>
  <div class="p-32rpx bg-pageBg h-100vh box-border">
    <div class="w-686rpx rounded-16rpx p-y-14rpx box-border">
      <div class="flex justify-between items-center">
        <div>
          <div class="flex">
            <div
              :class="mainDetail?.repairType === '1' ? 'bg-buttonColor' : 'bg-warn'"
              class="color-white w-96rpx mr-8rpx text-center rounded-8rpx lh-44rpx"
            >
              {{ mainDetail?.repairType === '1' ? '保养' : '维修' }}
            </div>
            <div class="font-bold">
              {{ mainDetail?.licensePlate ?
                mainDetail?.licensePlate?.slice(0, 2) + '·' + mainDetail?.licensePlate?.slice(2,
                                                                                              mainDetail?.licensePlate?.length) : mainDetail?.vin
              }}
            </div>
          </div>
          <div class="text-gray mt-14rpx text-medium">
            预约日期：{{ dayjs(mainDetail?.planArriveDate).format('YYYY年MM月DD日') + mainDetail?.planArriveTime }}
          </div>
        </div>
        <nx-image v-if="mainDetail?.status" :src="imgList[mainDetail?.status + '']" width="150rpx" height="150rpx" />
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-y-48rpx p-x-32rpx rounded-16rpx">
      <div>
        <div class="font-bold w-450rpx truncate">
          {{ mainDetail?.salesAreaName }}
        </div>
        <div class="text-gray mt-14rpx text-medium w-430rpx truncate">
          {{ mainDetail?.detailAddress }}
        </div>
      </div>
      <div class="flex">
        <div class="mr-28rpx" @click="call(mainDetail?.servicePhone)">
          <nx-image
            :src="'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/call_phone.png'"
            width="72rpx"
            height="72rpx"
          />
        </div>
        <div @click="openEnjoy">
          <nx-image
            :src="'https://imgs-test-1308146855.cos.ap-shanghai.myqcloud.com/car/icon_map_navigation.png'"
            width="72rpx"
            height="72rpx"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        姓名
      </div>
      <div class="text-gray">
        {{ mainDetail?.customerName }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        手机号
      </div>
      <div class="text-gray">
        {{ mainDetail?.cellPhoneNumber }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        维保单号
      </div>
      <div class="text-gray">
        {{ mainDetail?.appointNo }}
      </div>
    </div>
    <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        提交时间
      </div>
      <div class="text-gray">
        {{ dayjs(mainDetail?.createTime).format('YYYY年MM月DD日 HH:mm:ss') }}
      </div>
    </div>
    <div class="bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        预约说明
      </div>
      <div class="text-gray mt-16rpx">
        {{ mainDetail?.remark }}
      </div>
    </div>
    <div v-if="mainDetail?.status === 2 || mainDetail?.status === 1" class="bg-white mt-26rpx p-32rpx rounded-16rpx">
      <div class="w-142rpx">
        提示
      </div>
      <div class="text-gray mt-16rpx">
        {{ mainDetail?.status === 2 ? '您的维保预约已被确定，请在预约日期前往4S店！' : '您的维保预约已提交，请等待4S店接单！' }}
      </div>
    </div>
    <div v-if="mainDetail?.status === 4">
      <div class="font-bold m-y-48rpx">
        维保详情
      </div>
      <div class="flex justify-between items-center bg-white mt-26rpx p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          公里数
        </div>
        <div class="text-gray">
          {{ mainDetail?.mileage }}
        </div>
      </div>
      <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          项目
        </div>
        <div class="text-gray">
          {{ mainDetail?.items }}
        </div>
      </div>
      <div class="flex justify-between items-center bg-white p-32rpx rounded-16rpx">
        <div class="w-142rpx">
          材料
        </div>
        <div class="text-gray">
          {{ mainDetail?.materials }}
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <button
        v-if="[3, 4, 5].includes(mainDetail?.status || 0)"
        class="bg-white w-686rpx h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
        :class="[4].includes(mainDetail?.status || 0) && !mainDetail?.evaluate && !mainDetail?.score?'small-button':''"
        @click="router.redirectTo({ name: 'maintenanceAdd' })"
      >
        再次预约
      </button>
      <button
        v-if="[4].includes(mainDetail?.status || 0) && !mainDetail?.evaluate && !mainDetail?.score"
        class="bg-buttonColor w-320rpx h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-white border-buttonColor border-1rpx"
        @click="router.redirectTo({ name: 'evaluation',query:{id:mainDetail?.id,name:mainDetail?.salesAreaName} })"
      >
        评价
      </button>
    </div>
    <button
      v-if="mainDetail?.status === 1"
      class="bg-white h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
      @click="showDialog = true"
    >
      取消预约
    </button>
    <button
      class="bg-buttonColor h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-white border-buttonColor border-1rpx"
      @click="deleteFn"
    >
      删除
    </button>
    <AlertDialog
      v-model="showDialog"
      :appoint-no="mainDetail?.appointNo"
      @cancel="getMaintenanceDetailFn({ id: mainDetail?.id })"
    />
  </div>
</template>
<style scoped lang="scss">
  .small-button{
    width: 320rpx!important;
  }
</style>
