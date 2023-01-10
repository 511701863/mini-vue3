<script setup lang="ts">
import nxImage from '@/components/nxImage/nxImage.vue';
interface Props {
  name?: string,
  introduction?: string,
  provinceCityArea?: string,
  memberNumber?: number,
  activityNumber?: number,
  joinStatus?: number,
  logo?: string,
  clubId?: any,
  sign?:string
}
const props = defineProps<Props>();

interface AddClubProps {
  (event: 'addClub', param: any): void
  (event: 'clubDetail', param: any): void
}
const emit = defineEmits<AddClubProps>();
const addClub = () => {
  emit('addClub', { id: props?.clubId });
};
const clubDetail = () => {
  emit('clubDetail', {id:props?.clubId});
};
</script>

<template>
  <view
    class="flex m-t-40rpx"
    @click="clubDetail"
  >
    <view class="m-r-24rpx">
      <nx-image
        :src="props?.logo"
        :preview-list="[props?.logo]"
        width="150rpx"
        height="150rpx"
      />
    </view>
    <view class="flex-grow">
      <view class="flex justify-between text-titleMeduim">
        <view>{{ props?.name }}</view>
        <view class=" flex text-titleSmall color-primary">
          <view
            v-if="props?.joinStatus !== 0"
            @click="addClub"
          >
            <nx-image
              width="40rpx"
              height="40rpx"
              :static="props?.joinStatus === 2 ? 'club-add.png' : 'check-mark.png'"
            />
          </view>

          <text
            v-if="props.joinStatus === 2"
            class="align-top"
            @click.stop="addClub"
          >
            加入
          </text>
          <text
            v-if="props.joinStatus !== 2"
            :class="{ 'align-top': true, 'color-secondaryText': props?.joinStatus === 1 }"
          >
            {{ props?.joinStatus === 0 ? '申请中' : '已加入' }}
          </text>
        </view>
      </view>
      <view class="text-small">
        {{ props?.sign }}
      </view>
      <view class="m-t-26rpx text-titleSmall color-secondaryText">
        {{ props?.provinceCityArea!==null?props?.provinceCityArea + ' | ':'' }}{{ props?.memberNumber }}会员 | {{ props?.activityNumber }}活动
      </view>
    </view>
  </view>
</template>
