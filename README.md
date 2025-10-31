# Vue Mindmap & Workflow Component

## 项目介绍
Vue Mindmap & Workflow Component 是一个用于创建思维导图和工作流程图的 Vue 组件库，支持 Vue 2 和 Vue 3，允许用户轻松地构建和管理思维导图和工作流。

## 安装说明
使用 npm 或 yarn 安装：

```bash
npm install vue3-mindmap-component
```

或

```bash
yarn add vue3-mindmap-component
```

## 组件列表

### Mindmap 组件
- `MindmapEditor`: 思维导图编辑器
- `MindmapToolbar`: 思维导图工具栏

### Workflow 组件
- `WorkflowEditor`: 工作流编辑器
- `WorkflowNode`: 工作流节点
- `WorkflowConnection`: 工作流连接线

## API 文档

### MindmapEditor Props
- `data` (Array): 思维导图的数据源。
- `options` (Object): 组件的配置选项。

### MindmapEditor Events
- `node-click` (Function): 点击节点时触发的事件。

### WorkflowEditor Props
- `nodes` (Array): 工作流节点数组
- `connections` (Array): 工作流连接数组
- `editable` (Boolean): 是否可编辑，默认为 true

### WorkflowEditor Events
- `node-click`: 点击节点时触发
- `node-delete`: 删除节点时触发
- `node-move`: 移动节点时触发
- `connection-click`: 点击连接线时触发
- `canvas-click`: 点击画布时触发

## 示例代码

### Vue 3 使用方式

#### 全局注册
```javascript
import { createApp } from 'vue';
import VueMindmapWorkflow from 'vue3-mindmap-component';
import App from './App.vue';

const app = createApp(App);
app.use(VueMindmapWorkflow);
app.mount('#app');
```

#### 按需引入
```vue
<template>
  <div>
    <MindmapEditor :data="mindmapData" @node-click="handleNodeClick" />
    
    <WorkflowEditor 
      :nodes="workflowNodes"
      :connections="workflowConnections"
      @node-click="handleWorkflowNodeClick"
    />
  </div>
</template>

<script>
import { MindmapEditor, WorkflowEditor } from 'vue3-mindmap-component';

export default {
  components: { 
    MindmapEditor,
    WorkflowEditor 
  },
  data() {
    return {
      mindmapData: [
        { id: 1, label: '中心节点' },
        { id: 2, label: '子节点 1', parentId: 1 },
        { id: 3, label: '子节点 2', parentId: 1 },
      ],
      workflowNodes: [
        { id: 'node1', label: '开始', x: 100, y: 100 },
        { id: 'node2', label: '处理', x: 300, y: 100 },
        { id: 'node3', label: '结束', x: 500, y: 100 }
      ],
      workflowConnections: [
        { fromId: 'node1', toId: 'node2', startX: 220, startY: 100, endX: 300, endY: 100 },
        { fromId: 'node2', toId: 'node3', startX: 420, startY: 100, endX: 500, endY: 100 }
      ]
    };
  },
  methods: {
    handleNodeClick(node) {
      console.log('Clicked mindmap node:', node);
    },
    handleWorkflowNodeClick(data) {
      console.log('Clicked workflow node:', data);
    }
  },
};
</script>
```

### Vue 2 使用方式

```javascript
import Vue from 'vue';
import VueMindmapWorkflow from 'vue3-mindmap-component';

Vue.use(VueMindmapWorkflow);

new Vue({
  el: '#app',
  data: {
    workflowNodes: [
      { id: 'node1', label: '开始', x: 100, y: 100 },
      { id: 'node2', label: '处理', x: 300, y: 100 }
    ],
    workflowConnections: []
  }
});
```

## 贡献指南
欢迎贡献！请遵循以下步骤：
1. Fork 本仓库。
2. 创建新分支 (`git checkout -b feature-branch`)。
3. 提交你的变更 (`git commit -m 'Add new feature'`)。
4. 推送到分支 (`git push origin feature-branch`)。
5. 提交 Pull Request。