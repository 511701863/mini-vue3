<script setup lang="ts">
import * as problem from '@/interface/find/problem';
import * as topic from '@/interface/find/topic';
import nxImage from '@/components/nxImage/nxImage.vue';
interface Props{
  // eslint-disable-next-line vue/require-default-prop
  modelList?: any,
  // eslint-disable-next-line vue/require-default-prop
  questionTypeList?: problem.QuestionTypeProps[],
  // eslint-disable-next-line vue/require-default-prop
  relationClub?: topic.relationClub[],
  // eslint-disable-next-line vue/require-default-prop
  relationTopic?: topic.relationTopic[],
  highLight?:number,
  popularCurrency?: number,
  // eslint-disable-next-line vue/require-default-prop
  content?: string,
  ellipsis?:boolean,
  // eslint-disable-next-line vue/require-default-prop
  pictures?:string[],
  // eslint-disable-next-line vue/require-default-prop
  title?:string
}
const props = withDefaults(defineProps<Props>(), {
  popularCurrency: 0,
  highLight: 0,
  ellipsis:false
});
</script>

<template>
  <view>
    <view class="text-titleMedium font-500">
      {{ props?.title }}
    </view>
    <view
      class="m-t-12rpx  text-titleSmall flex"
      :class="{ 'line-clamp': props.ellipsis }"
    >
      {{ props.content }}
    </view>
  </view>
  <view
    v-if="props.pictures"
    class="card-3 m-t-15rpx"
  >
    <nx-image
      v-for="item in props.pictures"
      :key="item"
      :src="item"
      height="212rpx"
      width="212rpx"
    />
  </view>
  <view class="m-t-32rpx">
    <text
      v-if="props?.highLight"
      class="bg-essence color-whiteText p-8rpx m-r-10rpx  text-titleSmall text-center"
    >
      精华
    </text>
    <text
      v-for="item in props.modelList"
      :key="item.id"
      class="bg-inputGray p-8rpx m-r-10rpx  text-medium"
    >
      {{ item.name }}
    </text>
    <text
      v-for="item in props.questionTypeList"
      :key="item.questionType"
      class="bg-inputGray p-8rpx m-r-10rpx  text-medium"
    >
      {{ item.questionTypeName }}
    </text>
    <text
      v-for="item in props.relationClub"
      :key="item.id"
      class="bg-inputGray p-8rpx m-r-10rpx  text-medium"
    >
      {{ item.name }}
    </text>
    <text
      v-for="item in props.relationTopic"
      :key="item.id"
      class="bg-inputGray p-8rpx m-r-10rpx  text-medium"
    >
      {{ item.name }}
    </text>
  </view>
</template>
