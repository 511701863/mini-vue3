# vue3微信小程序

## 工程目录

```shell
.
├── .husky
│   ├── _
│   ├── commit-msg commit 信息校验钩子
│   └── pre-commit commit 前置钩子
├── .vscode
│   ├── extensions.json vscode 工作区插件推荐
│   ├── settings.json vscode 工作区设置
|   └── vue.code-snippets 工作区用户片段
├── dist
│   └── dev
|       └── mp-weixin 小程序包
├── src
│   ├── api 接口中心
│   ├── components 全局组件
│   ├── helper 辅助函数、增强函数
│   ├── hooks 全局hooks函数
│   ├── interface 业务全局interface
│   ├── pages 主包： 一级页面、模块通用组件
|   |    ├── common 公共页面
|   |    ├── components 公共业务组件
│   │    └── find 业务模块首页
|   │        └──components 单模块业务组件
|   ├── pagesFind 业务分包 二级页面，详情页
|   ├── router 路由封装
│   ├── static 静态资源：images、css
│   ├── store 状态管理
│   ├── utils 工具包：单独引入
│   │     ├── sdk 第三方sdk
|   |     └── request 请求封装
│   ├── wxcomponents UI组件:vant weapp
│   ├── App.vue 入口文件
│   ├── env.d.ts 全局声明
│   ├── main.ts 主入口
│   ├── manifest.json 应用配置文件
│   └── pages.json 全局配置文件
├── .editorconfig 编辑器配置
├── .eslintignore eslint忽略配置
├── .eslintrc.js eslint配置
├── .gitignore git忽略配置
├── commitlint.config.js commitlint配置
├── index.html 项目入口
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json ts配置
├── unocss.config.ts unocss配置
└── vite.config.ts vite配置
```
