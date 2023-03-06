<script setup lang="ts">
import nxInput from '@/components/nxInput/nxInput.vue';

import { useRouter } from '@/router/router';
import { onMounted, ref, reactive, watchEffect, watch, isRef, computed, useAttrs } from 'vue';
import { getMaintenanceCancel } from '@/api/my/maintenance';
import { useRequest } from '@/hooks/useRequest/useRequst';

type ControlDialogProps = {
  modelValue: boolean,
  type?: string,
  appointNo?:string | null
}
const { run: getMaintenanceCancelFn, data: mainDetail } = useRequest<MyCenter.MaintenanceAppointmentDetailAo>(getMaintenanceCancel, {
  manual: true,
  onSuccess:() => {
    console.log(mainDetail);

  }
});
const props = withDefaults(defineProps<ControlDialogProps>(), {
  modelValue: false,
  type: ''
});
const cancelReason =ref('');
const emit = defineEmits<{(evt: 'update:modelValue', value: boolean): void,
(evt: 'cancel'): void
}>();

function confirm(){
  getMaintenanceCancelFn({appointNo:props.appointNo, cancelReason:cancelReason.value});
  emit('cancel');
}
// function onSuccess(res:any) {
//   emit('update:modelValue', false);
// }
// const { run, data } = useRequest<any, any>(pushMsg, {
//   manual: true,
//   onSuccess
// });

</script>

<template>
  <van-dialog
    use-slot
    :show="props.modelValue"
    show-cancel-button
    :show-confirm-button="cancelReason"
    @cancel="emit('update:modelValue', false);"
    @close="emit('update:modelValue', false);"
    @confirm="confirm"
  >
    <view class="p-40rpx rounded-16rpx">
      <div class="text-center pb-48rpx font-bold">
        是否取消
      </div>
      <div class="text-center pb-32rpx text-gray">
        尊敬的车主，维保订单一经取消将不再生效，请确认是否取消？
      </div>
      <view class="code-box">
        <nxInput
          v-model="cancelReason"
          custom-style="background:#F8F9F9"
          type="textarea"
          :maxlength="20"
          show-word-limit
          placeholder="请输入取消说明（非必填）"
        />
      </view>
    </view>
  </van-dialog>
</template>
<style lang="scss" scoped>
</style>

