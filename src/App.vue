<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import qqmapsdk from '@/utils/sdk/qq-map-sdk/index';
import { login } from '@/helper/login/index';
import { QDinit } from '@/helper/tracker';

QDinit();
// login();

uni.getLocation({
  type: 'gcj02',
  success: (res) => {
    uni.setStorageSync('longitude', res.longitude);
    uni.setStorageSync('latitude', res.latitude);
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: res.latitude,
        longitude: res.longitude
      },
      success: function (res: any) {
        uni.setStorageSync('city', res.result.ad_info.city);
        uni.setStorageSync('findCity', res.result.ad_info.city);
        uni.setStorageSync('address', res.result.address);
      },
      fail: function (error: any) {
        console.error(error);
      }
    });
  },
  fail() {
    uni.showToast({
      title: '位置获取失败',
      icon: 'error',
      duration: 2000
    });
  }
});

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
<style>

</style>
