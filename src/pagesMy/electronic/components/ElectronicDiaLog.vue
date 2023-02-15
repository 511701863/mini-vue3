<script setup lang="ts">
import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed, useAttrs } from 'vue';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { getList, getList2, pushMsg } from '@/api/car/index';
import { debounce } from '@/utils/tool/index';

type ControlDialogProps = {
  modelValue: boolean,
  info?: any,
  overlay?:boolean
}

const attrs = useAttrs();
const router = useRouter();
const props = withDefaults(defineProps<ControlDialogProps>(), {
  modelValue: false,
  overlay:true,
  info: {}
});
const emit = defineEmits<{(evt: 'update:modelValue', value: boolean): void
}>();
const state = reactive<{clickItem:any, data:any}>({
  data: {},
  clickItem:null
});

function onSuccess(res:any) {
  emit('update:modelValue', false);
}
const { run, data } = useRequest<any, any>(pushMsg, {
  manual: true,
  onSuccess
});

</script>

<template>
  <page-meta :page-style="props.modelValue ? 'overflow: hidden' : ''">
    <van-popup
      :overlay="props.overlay"
      :show="props.modelValue"
      round
      position="bottom"
      overlay-style="background:rgba(0,0,0,0)"
      @close="emit('update:modelValue', false)"
    >
      <div class="p-32rpx">
        <div class="text-36rpx font-bold pb-34rpx">
          {{ props.info.name || '名称' }}
        </div>
        <div class="flex justify-between p-32rpx">
          <div>新增围栏</div>
          <div class="text-gray">
            凯翼研究院
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div>监控时段</div>
          <div class="text-gray">
            凯翼研究院
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div>监控车辆</div>
          <div class="text-gray">
            凯翼研究院
          </div>
        </div>
        <div class="flex justify-between p-32rpx">
          <div>告警提醒</div>
          <div class="text-gray">
            凯翼研究院
          </div>
        </div>
        <div class="flex justify-between p-t-32rpx">
          <button
            class="bg-white w-320rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx"
          >
            删除
          </button>
          <button
            class="bg-buttonColor w-320rpx h-100rpx text-32rpx lh-100rpx rounded-50rpx text-white"
            @click="router.navigateTo({ name:'electronicAdd',query:{add:false}})"
          >
            编辑
          </button>
        </div>
      </div>
    </van-popup>
  </page-meta>
</template>
<style lang="scss" scoped>
</style>

