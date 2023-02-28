<script setup lang="ts">
import { ref } from 'vue';

import MyCar from './components/MyCar.vue';
import Avatar from './components/Avatar.vue';

</script>

<template>
  <div class="bg-myCenter h-100vh">
    <Avatar />
    <view class="p-x-32rpx">
      <MyCar />
    </view>
  </div>
</template>
