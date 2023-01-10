<script setup lang="ts">

// TODO: DELETE
const tempImgSrc = 'https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0';

</script>

<template>
  <view class="w-full">
    <image
      class="w-full h-326rpx"
      :src="tempImgSrc"
      mode="aspectFill"
      :lazy-load="true"
    />
    <view class="mt-mini h-100rpx">
      <view class="text-22rpx color-primaryText">
        aranyaPost邮报
      </view>
      <view class="text-meduim color-primaryText">
        蓝牙运动无线耳机
      </view>
    </view>
    <view>
      <text class="text-meduim color-primaryText">
        ￥198
      </text>
      <text class="line-through text-small color-secondaryText">
        ￥398
      </text>
    </view>
  </view>
</template>
