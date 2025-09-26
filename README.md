# Vue3 Mindmap Component

## 项目介绍
Vue3 Mindmap Component 是一个用于创建思维导图的 Vue 3 组件，允许用户轻松地构建和管理思维导图。

## 安装说明
使用 npm 或 yarn 安装：

```bash
npm install vue3-mindmap-component
```

或

```bash
yarn add vue3-mindmap-component
```

## API 文档
### Props
- `data` (Array): 思维导图的数据源。
- `options` (Object): 组件的配置选项。

### Events
- `node-click` (Function): 点击节点时触发的事件。

## 示例代码
```vue
<template>
  <Mindmap :data="mindmapData" @node-click="handleNodeClick" />
</template>

<script>
import Mindmap from 'vue3-mindmap-component';

export default {
  components: { Mindmap },
  data() {
    return {
      mindmapData: [
        { id: 1, label: '中心节点' },
        { id: 2, label: '子节点 1', parentId: 1 },
        { id: 3, label: '子节点 2', parentId: 1 },
      ],
    };
  },
  methods: {
    handleNodeClick(node) {
      console.log('Clicked node:', node);
    },
  },
};
</script>
```

## 贡献指南
欢迎贡献！请遵循以下步骤：
1. Fork 本仓库。
2. 创建新分支 (`git checkout -b feature-branch`)。
3. 提交你的变更 (`git commit -m 'Add new feature'`)。
4. 推送到分支 (`git push origin feature-branch`)。
5. 提交 Pull Request。