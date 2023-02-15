import { defineConfig } from 'unocss';
import presetWeapp from 'unocss-preset-weapp';
import { transformerClass } from 'unocss-preset-weapp/transformer';

export default defineConfig({
  presets: [
    presetWeapp()
  ],
  theme: {
    colors: {
      // 主题色
      primary: '#376C80',
      secondaryDark: '#000000',
      secondaryLight: '#FFFFFF',
      myCenter:'#F5F6F6',
      // 语义色
      info: '#70c0e8',
      success: '#00CD00',
      warn: '#FF933B',
      error: '#FF594D',

      // 多彩色板
      pureBlue: '#BDD9E5',
      pureGreen: '#CDE5C2',
      pureYellow: '#E5D9AD',
      purePink: '#E5C7D1',

      // 文本色板
      primaryText: '#000000',
      secondaryText: 'rgba(0,0,0,0.4)',
      disableText: 'rgba(0,0,0,0.2)',
      grayText:'#666666',
      lightGrayText:'#999999',
      whiteText: '#FFFFFF',
      linkText: '#597BAE',
      placeHolder:'#c3c1c1',
      lightGray:'#EEEEEE',

      // 描边色
      stroke: 'rgba(0,0,0,0.6)',
      strokeWeak: 'rgba(0,0,0,0.1)',
      strokeSmall: 'rgba(0, 0, 0, 0.08)',

      // 分割色
      division: 'rgba(0,0,0,0.1)',

      // 背景色
      mantle: 'rgba(0,0,0,0.4)',
      successbg: 'rgba(116, 215, 144, 0.2)',
      errorbg: 'rgba(255, 89, 77, 0.2)',
      inputGray:'rgba(0,0,0, 0.04)',
      buttonColor:'#262626',
      buttonColorBlue:'#0080F6',
      buttonColorYellow:'#FF823A',
      pageBg:'#F8F9F9',
      // 业务色板
      money: '#FDD41BFF',

      // 评分
      star: '#E09D37',

      //精华
      essence:'#FB9600'
    },
    fontSize: {
      // 标题
      titleLogin: ['48rpx', '58rpx'],
      titleBig: ['40rpx', '56rpx'],
      titleLarge: ['32rpx', '48rpx'],
      titleMedium: ['28rpx', '40rpx'],
      titleSmall:['24rpx', '40rpx'],

      // 正文
      medium: ['24rpx', '34rpx'],
      small: ['20rpx', '40rpx'],

      // 按钮
      buttonMedium: ['28rpx', '80rpx'],
      buttonSmall: ['24rpx', '60rpx'],

      // Tab
      tab: ['32rpx', '32rpx']
    },
    spacing: {
      mini: '8rpx',
      small: '12rpx',
      normal: '16rpx',
      medium: '24rpx',
      large: '32rpx',
      big: '40rpx'
    }
  },
  shortcuts: {
    // 通用
    'wh-full': 'w-full h-full',
    'wh-screen': 'w-screen h-screen',
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between items-center',
    'container': 'pt-0 pb-0 pr-32rpx pl-32rpx',
    // 卡片（card-row: 一行几个）
    'card-2': 'grid grid-cols-2  grid-gap1',
    'card-3': 'grid grid-cols-3  grid-gap1',
    // 渐变背景
    'bg-gradient': 'bg-gradient-to-b from-pureBlue via-pureBlue to-secondaryLight',
    // 按钮
    'button-primary': 'bg-buttonColor w-320rpx h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-whiteText border-buttonColor',
    'button-white': 'bg-white h-100rpx mt-48rpx text-32rpx lh-100rpx rounded-50rpx text-buttonColor border-buttonColor border-1rpx',
    'button-minor-disable': 'w-full h-80rpx bg-secondaryLight border-1rpx strokeWeak text-disableText text-buttonMedium text-center box-border',

    'button-primary-medium': 'w-240rpx h-80rpx bg-primary b-rd-0 text-whiteText text-buttonMedium font-500 text-center',
    'button-minor-medium': 'w-240rpx h-80rpx border-1rpx border-stroke bg-secondaryLight b-rd-0 text-primaryText text-buttonMedium text-center box-border',

    'button-primary-large': 'w-326rpx h-80rpx bg-primary b-rd-0 text-whiteText text-buttonMedium font-500 text-center',
    'button-minor-large': 'w-326rpx h-80rpx border-1rpx border-stroke bg-secondaryLight b-rd-0 text-primaryText text-buttonMedium text-center box-border',

    'button-primary-big-large':'w-670rpx h-80rpx bg-primary b-rd-0 text-whiteText text-buttonMedium font-500 text-center',

    'button-primary-normal': 'w-216rpx h-80rpx bg-primary b-rd-0 text-whiteText text-buttonMedium text-center m-0',

    'button-primary-small': 'w-144rpx h-60rpx leading-60rpx bg-primary b-rd-0 text-whiteText text-buttonSmall font-500 text-center',
    'button-minor-small': 'w-144rpx h-60rpx leading-60rpx border-1rpx border-stroke bg-secondaryLight b-rd-0 text-buttonSmall text-center box-border',
    'button-error-small': 'w-144rpx h-60rpx leading-60rpx border-1rpx border-error bg-secondaryLight b-rd-0 text-buttonSmall text-error text-center'

  },
  transformers: [
    transformerClass()
  ]
});
