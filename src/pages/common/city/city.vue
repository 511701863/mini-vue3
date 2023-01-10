<script setup lang="ts">
import { useRouter } from '@/router/router';
import { cityList } from '@/api/common/area';
import { ref, getCurrentInstance } from 'vue';
import { useFind } from '@/store/modules/find';
import { onLoad } from '@dcloudio/uni-app';

const findStore = useFind();
const router = useRouter();
const city = ref<any>({});
const lists = ref<string[]>([]);
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
const indexList=ref();
async function citylist() {
  const data = await cityList();
  lists.value=data.list;
  lists.value.forEach((item: any) => {
    if (city.value[item.firstChar]) {
      // 对象中有该首字母的属性 将数据进行添加
      city.value[item.firstChar].push(item);
    } else {
      // 对象中没有该首字母的属性 对该首字母初始化
      city.value[item.firstChar] = [item];
    }
  });
  console.log(city.value);
  console.log(Object.keys(city.value));
  indexList.value = Object.keys(city.value);
  indexList.value.sort();
}
citylist();
const cityClick=(item:any) => {
  findStore.pushCity({areaId:item.areaId, areaName:item.areaName});
  if(eventChannel) {
    eventChannel.emit('cityName', item.areaName);
  }
  router.navigateBack({});
};
let eventChannel:any = null;
onLoad(() => {
  const proxy = getCurrentInstance()?.proxy;
  eventChannel = proxy ? (proxy as any).getOpenerEventChannel() : null;
});
</script>

<template>
  <view>
    <van-index-bar
      :index-list="indexList"
      highlight-color="#376C80"
    >
      <view
        v-for="item in indexList"
        :key="item"
      >
        <van-index-anchor
          :index="item"
        />

        <van-cell
          v-for="ite in city[item]"
          :key="ite.areaId"
          :title="ite.areaName"
          @click="cityClick(ite)"
        />
      </view>
    </van-index-bar>
  </view>
</template>
