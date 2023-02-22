<script setup lang="ts">
import { ref, reactive, Ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

import { checkHasSetPin} from '@/api/my/pinConfig';
import { useRouter } from '@/router/router';
import { useRequest } from '../../hooks/useRequest/useRequst';

const router = useRouter();
const {run:checkPinFn, data:hasPin} = useRequest<boolean>(checkHasSetPin, {
  manual:false
});

</script>

<template>
  <div class="bg-pageBg h-100vh p-32rpx">
    <van-cell title="PIN码设置" clickable is-link @click="router.navigateTo({name:'pinConfigSetPin'})" />
    <van-cell v-if="hasPin" title="忘记PIN码" clickable is-link @click="router.navigateTo({name:'pinConfigForgetPin'})" />
  </div>
</template>
<style scoped lang="scss">
</style>
