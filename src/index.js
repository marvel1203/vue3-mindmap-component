// Import all components
import MindmapEditor from './components/MindmapEditor.vue';
import MindmapToolbar from './components/MindmapToolbar.vue';
import WorkflowNode from './components/WorkflowNode.vue';
import WorkflowConnection from './components/WorkflowConnection.vue';
import WorkflowEditor from './components/WorkflowEditor.vue';

// Component list
const components = [
  MindmapEditor,
  MindmapToolbar,
  WorkflowNode,
  WorkflowConnection,
  WorkflowEditor
];

// Install function for Vue.use()
const install = function(Vue) {
  // Check if already installed
  if (install.installed) return;
  install.installed = true;
  
  // Register all components
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

// Auto-install when vue is found (for browser environments)
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// Export individual components
export {
  MindmapEditor,
  MindmapToolbar,
  WorkflowNode,
  WorkflowConnection,
  WorkflowEditor
};

// Export install function and components as default
export default {
  install,
  MindmapEditor,
  MindmapToolbar,
  WorkflowNode,
  WorkflowConnection,
  WorkflowEditor
};