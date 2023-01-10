<script setup lang="ts">
import { getAllArea } from '@/api/common/area';
import { onMounted, ref, Ref, computed } from 'vue';

/**
 * 表单-省市区组件
 * author:颜必行
 */

interface Props {
  modelValue?: number | string,
  label?: string,
  placeholder?: string,
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  label: '',
  required: false
});

interface Emit {
  (e: 'update:modelValue', modelValue: number | string): void
}

const emit = defineEmits<Emit>();

const show = ref(false);

const activeArea = ref([]);

const select = (e: any) => {
  emit('update:modelValue', e.detail.value);
};
interface areaList {
  province_list: Record<number, string>
  city_list: Record<number, string>
  county_list: Record<number, string>
}

const areaList: Ref<areaList> = ref({
  province_list: {},
  city_list: {},
  county_list: {}
});

const confirm = (e:any) => {
  console.log('area', e.detail);
  activeArea.value = e.detail.values.map((v:any) => v.name);
  emit('update:modelValue', e.detail.values[2].code);
  show.value = false;
};

onMounted(async () => {
  const { list: province } = await getAllArea();
  const province_list: areaList['province_list'] = {};
  const city_list: areaList['province_list'] = {};
  const county_list: areaList['province_list'] = {};

  for (let item of province) {
    switch (item.areaLevel) {
      case 1:
        province_list[item.areaId] = item.areaName;
        break;
      case 2:
        city_list[item.areaId] = item.areaName;
        break;
      case 3:
        county_list[item.areaId] = item.areaName;
        break;
      default:
        console.log('未知地区层级');
        break;
    }

  }

  areaList.value.province_list = province_list;
  areaList.value.city_list = city_list;
  areaList.value.county_list = county_list;
  areaList.value = JSON.parse(JSON.stringify(areaList.value));
});

const content = computed(() => {
  const content = activeArea.value.join('/');
  return content ? content : props.placeholder;
});

</script>

<template>
  <van-cell
    :title="props.label"
    is-link
    :value="content"
    :required="required"
    @click="show = true"
  />
  <van-action-sheet
    :title="props.label"
    :show="show"
    @select="select"
    @close="show = false"
  >
    <van-area
      :value="props.modelValue"
      :area-list="areaList"
      :columns-placeholder="['请选择', '请选择', '请选择']"
      @cancel="show = false"
      @confirm="confirm"
    />
  </van-action-sheet>
</template>
