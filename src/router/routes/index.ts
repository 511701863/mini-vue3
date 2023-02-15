export const pages = [
  {
    'path': 'pages/control/index',
    'name': 'control',
    'style': {
      'navigationBarTitleText': '爱车',
      'navigationBarBackgroundColor':'#FFFFFF',
      'navigationBarTextStyle':'black',
      'backgroundColor':'#EAECF3',
      'navigationStyle': 'custom'
    }
  },

  {
    'path': 'pages/my/index',
    'name': 'my',
    'style': {
      'navigationBarTitleText': '我的'
    }
  },
  {
    'path': 'pages/selectStore/index',
    'name': 'selectStore',
    'style': {
      'navigationBarTitleText': '选择4S店',
      'navigationBarBackgroundColor':'#FFFFFF'
    }
  },
  {
    'path': 'pages/common/register/index',
    'name': 'register',
    'style': {
      'navigationBarTitleText': '注册'
    }
  },
  {
    'path': 'pages/common/login/index',
    'name': 'login',
    'style': {
      'navigationBarTitleText': '登录'
    }
  },
  {
    'path': 'pages/common/logout/index',
    'name': 'logout',
    'style': {
      'navigationBarTitleText': '个人信息'
    }
  },
  {
    'path': 'pages/common/baseH5/index',
    'name': 'baseH5'
  }
] as const;
export const subPackages = [
  {
    'root': 'pagesControl',
    'pages': [
      {
        'path': 'air/index',
        'name': 'airControl',
        'style': {
          'navigationBarBackgroundColor':'#e1e7f0',
          'navigationBarTitleText': '空调'
        }
      },
      {
        'path': 'location/index',
        'name': 'locationService',
        'style': {
          'navigationBarTitleText': '位置服务'
        }
      }
    ]
  },
  {
    'root': 'pagesMy',
    'pages': [
      {
        'path': 'message/index',
        'name': 'message',
        'style': {
          'navigationBarTitleText': '消息中心'
        }
      },
      {
        'path': 'message/detail/service',
        'name': 'messageService',
        'style': {
          'navigationBarTitleText': '服务消息'
        }
      },
      {
        'path': 'message/detail/failure',
        'name': 'messageFailure',
        'style': {
          'navigationBarTitleText': '故障提醒'
        }
      },
      {
        'path': 'message/detail/warning',
        'name': 'messageWarning',
        'style': {
          'navigationBarTitleText': '告警提醒'
        }
      },
      {
        'path': 'message/detail/maintain',
        'name': 'messageMaintain',
        'style': {
          'navigationBarTitleText': '保养提醒'
        }
      },
      {
        'path': 'message/detail/notice',
        'name': 'messageNotice',
        'style': {
          'navigationBarTitleText': '通知消息'
        }
      },
      {
        'path': 'message/detail/flow',
        'name': 'messageFlow',
        'style': {
          'navigationBarTitleText': '流量提醒'
        }
      },
      {
        'path': 'pinConfig/index',
        'name': 'pinConfig',
        'style': {
          'navigationBarTitleText': 'PIN码管理'
        }
      },
      {
        'path': 'pinConfig/forgetPin',
        'name': 'pinConfigForgetPin',
        'style': {
          'navigationBarTitleText': 'PIN码找回'
        }
      },
      {
        'path': 'pinConfig/original',
        'name': 'pinConfigOriginal',
        'style': {
          'navigationBarTitleText': '设置PIN码'
        }
      },
      {
        'path': 'pinConfig/setPin',
        'name': 'pinConfigSetPin',
        'style': {
          'navigationBarTitleText': '设置PIN码'
        }
      },
      {
        'path': 'carManagement/index',
        'name': 'carManagement',
        'style': {
          'navigationBarTitleText': '车辆管理'
        }
      },
      {
        'path': 'carManagement/record',
        'name': 'carManagementRecord',
        'style': {
          'navigationBarTitleText': '控车记录'
        }
      },
      {
        'path': 'carManagement/authRecord',
        'name': 'carManagementAuthRecord',
        'style': {
          'navigationBarTitleText': '车辆授权记录'
        }
      },
      {
        'path': 'carManagement/carAuth',
        'name': 'carManagementCarAuth',
        'style': {
          'navigationBarTitleText': '车辆授权'
        }
      },
      {
        'path': 'carManagement/authDetail',
        'name': 'carManagementAuthDetail',
        'style': {
          'navigationBarTitleText': '被授权车辆详情'
        }
      },
      {
        'path': 'carManagement/bindCarConfirm',
        'name': 'carManagementBindCarConfirm',
        'style': {
          'navigationBarTitleText': '车辆信息确认'
        }
      },
      {
        'path': 'carManagement/bindCar',
        'name': 'carManagementBindCar',
        'style': {
          'navigationBarTitleText': '添加车辆'
        }
      },
      {
        'path': 'carManagement/detail',
        'name': 'carManagementDetail',
        'style': {
          'navigationBarTitleText': '车辆详情'
        }
      },
      {
        'path': 'electronic/index',
        'name': 'electronic',
        'style': {
          'navigationBarTitleText': '电子围栏'
        }
      },
      {
        'path': 'electronic/list',
        'name': 'electronicList',
        'style': {
          'navigationBarTitleText': '电子围栏列表'
        }
      },
      {
        'path': 'electronic/detail',
        'name': 'electronicDetail',
        'style': {
          'navigationBarTitleText': '电子围栏详情'
        }
      },
      {
        'path': 'electronic/add',
        'name': 'electronicAdd',
        'style': {
          'navigationBarTitleText': ''
        }
      },
      {
        'path': 'electronic/info',
        'name': 'electronicInfo',
        'style': {
          'navigationBarTitleText': ''
        }
      },
      {
        'path': 'maintenance/index',
        'name': 'maintenance',
        'style': {
          'navigationBarTitleText': '我的维保'
        }
      },
      {
        'path': 'maintenance/detail',
        'name': 'maintenanceDetail',
        'style': {
          'navigationBarTitleText': '维保详情'
        }
      },
      {
        'path': 'maintenance/add',
        'name': 'maintenanceAdd',
        'style': {
          'navigationBarTitleText': '维保预约'
        }
      }
    ]
  }
] as const;

export const tabBar = {
  'color': '#060606',
  'selectedColor': '#000000',
  'backgroundColor': '#FFFFFF',
  'list': [
    {
      'pagePath': 'pages/control/index',
      'iconPath': 'static/images/car/tab3.png',
      'selectedIconPath': 'static/images/car/tab3_select.png',
      'text': '爱车'
    },
    {
      'pagePath': 'pages/my/index',
      'iconPath': 'static/images/car/tab5.png',
      'selectedIconPath': 'static/images/car/tab5_select.png',
      'text': '我的'
    }
  ]
} as const;
