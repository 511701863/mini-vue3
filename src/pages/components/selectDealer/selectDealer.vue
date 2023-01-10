<script setup lang="ts">
import { computed } from 'vue';
import { useDealer } from '@/store/modules/dealer';
import { useRouter } from '@/router/router';

const router = useRouter();

/**
 * 表单-选择经销商
 * author:颜必行
 */
const { dealer, clear } = useDealer();

clear();

interface Props {
  label?: string,
  placeholder?: string,
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  label: '',
  required: false
});

const content = computed(() => {
  const activeItem = dealer.name;
  return activeItem ? activeItem : props.placeholder;
});

</script>

<template>
  <van-cell
    :title="props.label"
    is-link
    :value="content"
    :required="props.required"
    @click="router.navigateTo({ name: 'dealer' })"
  />
</template>
