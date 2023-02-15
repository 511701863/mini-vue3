<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import ElectronicDiaLog from './components/ElectronicDiaLog.vue';

import { getList, getList2 } from '@/api/car/index';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';
import nxImage from '@/components/nxImage/nxImage.vue';
import nxScrollView from '@/components/nxScrollView/index.vue';

const router = useRouter();

</script>

<template>
  <div class="bg-pageBg h-100vh p-32rpx">
    <van-cell title="PIN码设置" clickable is-link @click="router.navigateTo({name:'pinConfigSetPin'})" />
    <van-cell title="忘记PIN码" clickable is-link @click="router.navigateTo({name:'pinConfigForgetPin'})" />
  </div>
</template>
<style scoped lang="scss">
</style>
