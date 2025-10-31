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

## 调试和示例页面
为了方便开发和测试，我们提供了一个功能完整的调试示例页面。

### 使用调试页面
1. 打开 `examples/debug.html` 文件
2. 在浏览器中直接打开该文件（无需服务器）
3. 或者使用本地服务器访问：
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
   # 或使用 Node.js http-server
   npx http-server
   ```
4. 在浏览器中访问 `http://localhost:8000/examples/debug.html`

### 调试页面功能
调试页面提供了以下功能：

#### 基本操作
- **添加节点**：在控制面板输入节点标签，点击"添加节点"按钮
- **删除节点**：选中节点后，点击"删除节点"按钮（会同时删除子节点）
- **选择节点**：点击节点进行选择或取消选择

#### 高级功能
- **撤销/重做**：支持操作历史记录的撤销和重做
- **数据编辑**：直接编辑 JSON 格式的思维导图数据
- **数据导出**：将当前思维导图数据导出为 JSON 文件
- **重置数据**：恢复到默认示例数据
- **清空所有**：清除所有节点

#### 调试信息
页面底部显示实时调试信息，包括：
- 节点总数
- 当前选中的节点
- 历史记录状态
- 完整的数据结构

### 调试页面截图
调试页面提供了直观的界面，包括：
- 左侧控制面板：用于操作和配置
- 右侧预览区域：实时显示思维导图
- 调试信息面板：查看数据结构和状态

## 贡献指南
欢迎贡献！请遵循以下步骤：
1. Fork 本仓库。
2. 创建新分支 (`git checkout -b feature-branch`)。
3. 提交你的变更 (`git commit -m 'Add new feature'`)。
4. 推送到分支 (`git push origin feature-branch`)。
5. 提交 Pull Request。