import MindmapEditor from './components/MindmapEditor.vue'
import MindmapToolbar from './components/MindmapToolbar.vue'
import MindmapNavigator from './components/MindmapNavigator.vue'
import './styles/mindmap.css'

// 组件列表
const components = [
  MindmapEditor,
  MindmapToolbar,
  MindmapNavigator
]

// 定义 install 方法
const install = function (app) {
  // 遍历注册所有组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// 判断是否是直接引入文件，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出 install 方法和组件
export {
  install,
  MindmapEditor,
  MindmapToolbar,
  MindmapNavigator
}

export default {
  install
}