总体设计：
三种模块：（基本信息只有一项且置顶，可以添加 group-title 模块和 simple-title 模块，且这两个模块可以拖拽排序）

- 基本信息：base，填写姓名、年龄、电话、邮箱、职位等信息
- 多项经历：group-title，有多项经历的，比如教育经历、工作经历等，可以添加子项
- 单项描述：simple-title，单独描述，比如个人评价

group-title

- title
- group （数组）
  - sub-title（最多 4 项内容）
  - htmlDesc

simple-title

- title
- htmlDesc

```js
data = {
  base: {
    name: "",
    age: "",
    phone: "",
    email: "",
    post: "",
    image: "",
  },
  module: [
    {
      title: 教育背景,
      type: group,
      group: [
        {
          subTitle: ["2021-12 ~ 至今", "商品在售及发布系统（公司项目）", "前端开发"],
          htmlDesc: "<p>富文本描述</p>",
        },
      ],
    },
    {
      title: 个人评价,
      type: simple,
      htmlDesc: "<p>富文本描述</p>",
    },
  ],
};
```

添加自定义样式： 以字段路径作为 class，如 <span class="base-module-0-title"></span>

```js
style = {
  'base-name': {color: 'red'},
  'base-module-0-title': {...},
}
```

组件设计
text-input
该组件显示为文本，双击变成 input 模式，可以进行修改文本功能，失去焦点或 enter 后变成文本，(右键打开弹窗可以配置自定义样式)
props.mode = input | htmlInput
