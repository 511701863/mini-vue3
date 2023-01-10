<script setup lang="ts">
import { useRouter } from '@/router/router';
import { cityList } from '@/api/common/area';
import { ref } from 'vue';
import { useFind } from '@/store/modules/find';

const findStore = useFind();
const router = useRouter();
const city = ref<any>({});
const lists=ref();
const indexList=ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']);
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
}
citylist();
const cityClick=(item:any) => {
  findStore.pushCity({areaId:item.areaId, areaName:item.areaName});
  console.log(findStore.city);
};

</script>

<template>
  <view>
    <van-index-bar
      :index-list="indexList"
      highlight-color="#07c16c"
      :sticky-offset-top="100"
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
