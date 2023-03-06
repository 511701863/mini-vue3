<script setup lang="ts">
import nxInput from '@/components/nxInput/nxInput.vue';

import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed, useAttrs } from 'vue';
import { MaintenanceEvaluate } from '@/api/my/maintenance';
import { useRequest } from '@/hooks/useRequest/useRequst';
import { onLoad } from '@dcloudio/uni-app';
const router = useRouter();
const { run: evaluateFn, data: mainDetail } = useRequest(MaintenanceEvaluate, {
  manual: true,
  onSuccess: () => {
    router.navigateBack({});
  }
});

const evaluate = ref('');
const score = ref(0);
const mid: any = ref('');
onLoad((e) => {
  const { id, name } = e;
  wx.setNavigationBarTitle({ title: name ?? '评价' });
  mid.value = id;
});
function onChange(event: any) {
  score.value = event.detail;
}

</script>

<template>
  <div class="p-40rpx box-border h-100vh relative">
    <div class="mt-110rpx"></div>
    <div class="flex flex-center flex-col">
      <van-rate
        :value="score"
        allow-half
        void-icon="star"
        color="#FF933B"
        void-color="#DDDDDD"
        size="60rpx"
        gutter="48rpx"
        @change="onChange"
      />
      <div class="mt-48rpx mb-96rpx">
        请为本次服务打分
      </div>
    </div>
    <nxInput
      v-model="evaluate"
      custom-style="background:#F8F9F9"
      type="textarea"
      :maxlength="100"
      :autosize="[100, 100]"
      show-word-limit
      placeholder="您的评价会督促我们做得更好…"
    />
    <div class="absolute bottom-40rpx left-40rpx">
      <button
        :disabled="evaluate.length<6 || score===0"
        class="bg-buttonColor w-670rpx h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-white"
        @click="evaluateFn({id:mid,score,evaluate})"
      >
        提交
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

