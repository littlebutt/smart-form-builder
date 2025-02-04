# smart-form-builder: 基于React的智能表单设计器

## 介绍

本项目提供了一种易上手、高性能和快操作的表单设计器的实现思路。用户可以通过“低代码”的方式拖拉控件、编排布局和设置属性，并生成高度定制化的功能表单。该产品适用场景广泛，包括政企单位业务流程、仓库管理、合同审批和客户管理等系统应用，也包括个人学习交流的项目等。

![效果展示](./docs/smart-form-builder.gif)

## 技术路线和实现思路

本项目采用React技术栈，包括Next.js、Ant Design以及React Grid Layout。考虑到项目的高度定制化的需求，用户可以选择适合自己项目的UI框架、Grid工具等，本项目只提供基本的实现思路和设计案例。

页面分为左中右三个部分——组件工具栏、表单画布和组件属性栏。各部分对应的实现代码如下

```
src/app
|_ components
  |_ widgets // 各种基本组件，包括input、datetimepicker和select等
  |_ form-canvas.tsx // 表单画布
  |_ toolbar.tsx // 组件工具栏
  |_ widget-info.tsx // 组件属性栏
  |_ wisgets.tsx // 组件列表
|_ hook
  |_ use-window-size.ts // 获取页面大小的hook
|_ favicon.ico // 图标文件
|_ layout.tsx
|_ page.tsx // 项目主页面，引用上述三个栏目部分

```
page页面包含当前组件的各属性状态，组件属性栏widget-info可以对此读写。当各属性状态更新后，表单画布form-canvas可以时事更新画布内容。form-canvas同时提供`addNode`和`removeNode`接口，组件工具栏toolbar通过调用`addNode`添加组件，widget-info通过调用`removeNode`删除当前组件。当前组件的各属性状态通过form-canvas对组件的点击操作`onClick`绑定，也就是说用户想要对某个组件的位置、属性和约束定义时必须先**点击选中**目标组件。


## 声明

由于本项目开发的时候Ant Design不支持最新的React19，所以会有一个不影响使用的报错。该报错预计等到Ant Design升级后修复。

