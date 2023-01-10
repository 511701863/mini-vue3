<script setup lang="ts">
/**
 * 上传组件（cos上传、base64上传）
 * author: 颜必行
 */
import { getCosKeyByFilePath } from '@/api/common/bucketTmpKey';
import { cosUpload, base64Upload } from './upload';
import { ref } from 'vue';

interface File {
  url: string,
  name?: string
}

interface Props {
  modelValue: File[],
  accept?: 'all' | 'media' | 'image' | 'video' | 'file',
  maxCount?: number,
  previewSize?: string,
  type?: 'cos' | 'base64'
}

const props = withDefaults(defineProps<Props>(), {
  accept: 'image',
  maxCount: 1,
  previewSize: '200rpx',
  type: 'cos'
});

const emit = defineEmits(['update:modelValue']);

let fileList = ref<File[]>(props.modelValue ?? []);

function afterRead(e: any) {
  const path = e.detail.file.url;
  const name = path.split('/').pop();
  if (props.type === 'base64') {
    uploadByBase64(path);
  } else {
    uploadByCos(path, name);
  }
}

async function uploadByCos(filePath: string, fileName: string) {
  const data = await getCosKeyByFilePath({ filePath, fileName });
  const url = await cosUpload(data[0]);
  fileList.value.push({ url });
  fileList.value = JSON.parse(JSON.stringify(fileList.value));
  emit('update:modelValue', fileList);
}

async function uploadByBase64(filePath: string) {
  const url = await base64Upload(filePath);
  fileList.value.push({ url });
  fileList.value = JSON.parse(JSON.stringify(fileList.value));
  emit('update:modelValue', fileList);
}

const deleteImg = (e: any) => {
  fileList.value.splice(e.detail.index, 1);
  fileList.value = JSON.parse(JSON.stringify(fileList.value));
  emit('update:modelValue', fileList);
};
</script>

<template>
  <img v-if="(type === 'base64' && fileList.length > 0)" class="w-670rpx h-490rpx" :src="fileList[0].url">
  <van-uploader
    v-else
    :file-list="fileList"
    :max-count="props.maxCount"
    :preview-size="props.previewSize"
    :accept="props.accept"
    :deletable="true"
    :preview-image="true"
    :multiple="false"
    @delete="deleteImg"
    @after-read="afterRead"
  >
    <slot></slot>
  </van-uploader>
</template>

