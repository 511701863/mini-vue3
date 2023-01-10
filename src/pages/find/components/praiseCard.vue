<script setup lang="ts">
import { Data } from '@/interface/find/publicPraise';
import browseComments from '@/components/browseComments/browseComments.vue';
import userInfo from '@/components/userinfo/userInfo.vue';
import { useRouter } from '@/router/router';
import nxImage from '@/components/nxImage/nxImage.vue';
const router = useRouter();

interface Props {
  props: Data
}

defineProps<Props>();
interface emitsProps{
  (e:'followClick', param:any):void
}
const emits=defineEmits<emitsProps>();
const followClick=(param:any) => {

  emits('followClick', param);
};

</script>

<template>
  <view class="m-t-64rpx">
    <userInfo
      :userinfo="props.createUser"
      :model="props.vehicleSeriesName"
      @follow-click="followClick"
    />
    <view @click="router.navigateTo({name:'publicDetail',query:{id:props.id}})">
      <view class=" m-t-medium m-b-normal">
        <view>
          <view class="flex items-center m-t-34rpx">
            <text class="text-meduim font-500 m-r-medium">
              综合评分
            </text>
            <van-rate
              readonly
              :value="props.synthesizeScore"
              :size="12"
              color="#E09D37"
              void-icon="star"
              void-color="#eee"
              class="m-r-large leading-10rpx"
            />
            <text class="font-500 color-star text-titleMeduim">
              {{ props.synthesizeScore }}
            </text>
          </view>
        </view>
      </view>
      <view class=" p-b-40rpx border-b border-strokeWeak relative">
        <view
          v-if="props.isHighLight===1"
          class="absolute right-0 top--80rpx"
        >
          <nx-image
            static="highLight.png"
            width="128rpx"
            height="128rpx"
          />
        </view>
        <text class="text-small font-400 px-small py-mini bg-success color-whiteText">
          最满意
        </text>
        <view class="m-t-normal font-400 text-meduim">
          {{ props.mostSatisfied }}
        </view>
        <view class="p-y-20rpx">
          <browseComments
            type="1"
            :create-time="props?.createTime"
            :like-number="props?.likeNumber"
            :answer-number="props?.commentNumber"
          />
        </view>
      </view>
    </view>
  </view>
</template>
