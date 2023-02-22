import { post, get } from '@/http/index';

//判断账号是否已经设置PIN码
export function checkHasSetPin<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/checkHasSetPin',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//校验pin码
export function verifyPin<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/verifyPin',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
export function getPublicKey<P = any>(data: P) {
  return post<any>({
    url: '/community-vip-user/exterior/account/getPublicKey',
    data,
    loading: false,
    loadingMask: true,
    header: {
      deviceSN:''
    }
  });
}
//通过原PIN码重新设置PIN码
export function resetByOldPin<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/resetByOldPin',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//通过原PIN码重新设置PIN码
export function resetPinByPhone<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/resetPinByPhone',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//通过原PIN码重新设置PIN码
export function setPin<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/setPin',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//提交手机号，并发送验证码
export function submitPhone<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/submit_phone',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//提交手机号，并发送验证码
export function resendSubmitPhone<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/resend',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
//提交手机号，并发送验证码
export function submitPhoneAndCode<P = any>(data: P) {
  return post<boolean>({
    url: '/tsp-subscription/v1/pin/submit',
    data,
    loading: true,
    loadingMask: true,
    header: {
    }
  });
}
