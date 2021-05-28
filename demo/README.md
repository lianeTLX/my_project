# demo

当前工程为前端vue工程（页面）

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# Liane's DEMO

## 1、业务背景及功能描述

- 项目搭建：
  1. @vue/cli + webpack ;
  2. Vuex做状态管理;
  3. axios实现数据
  4. VueRouter实现路由配置
  5. 使用Less

- ​	商品信息展示;

- ​	添加商品;
- ​	编辑商品信息;
- ​	删除商品数据;
- ​	根据商品ID查找商品;

## 2、模块技术说明

### 1）vue界面实现

1. 公共组件
   1. Table组件：提供一个数组，动态渲染成table表格
   2. Form组件：提供一个对象，动态渲染成form表单，提供动态验证方法
   3. EditBar组件：编辑栏组件，根据传入数据动态生成添加商品和编辑商品两种模式
   4. MyConfirm组件：公共提示框
2. 公共方法
   1. 封装了input输入验证等方法
3. 公共样式
   1. 封装了主题颜色
   2. 自定义按钮样式
   3. 自定义input框样式





### 2）node服务端实现

使用nodejs结合MVC框架express，结合数据库MySQL实现 了商品模块的CRUD操作，供前端页面实现数据动态访问；



### 3）项目部署

#### 实现了两种方案（使用pm2）

- 前后端分离部署

  线上部署地址：nas.yysxyy.com:10910（前端）、nas.yysxyy.com:10911（服务端）

- 统一部署

  线上部署地址：nas.yysxyy.com:10911（服务端+dist静态）









