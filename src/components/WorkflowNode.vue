<template>
  <div 
    class="workflow-node"
    :style="nodeStyle"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <div class="node-header">
      <span class="node-label">{{ node.label }}</span>
      <button 
        v-if="showDelete" 
        class="delete-btn"
        @click.stop="handleDelete"
      >×</button>
    </div>
    <div class="node-content">
      <slot :node="node"></slot>
    </div>
    <div class="node-ports">
      <div class="port port-input" :data-port="'input'"></div>
      <div class="port port-output" :data-port="'output'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkflowNode',
  props: {
    node: {
      type: Object,
      required: true,
      default: () => ({ label: '', x: 0, y: 0, id: '' })
    },
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click', 'delete', 'drag-start'],
  computed: {
    nodeStyle() {
      return {
        left: `${this.node.x || 0}px`,
        top: `${this.node.y || 0}px`,
      };
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', { node: this.node, event });
    },
    handleDelete() {
      this.$emit('delete', this.node);
    },
    handleMouseDown(event) {
      this.$emit('drag-start', { node: this.node, event });
    }
  }
};
</script>

<style scoped>
.workflow-node {
  position: absolute;
  min-width: 120px;
  background: #fff;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  padding: 10px;
  cursor: move;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  user-select: none;
}

.workflow-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.node-label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
}

.delete-btn:hover {
  background: #cc0000;
}

.node-content {
  min-height: 20px;
  color: #666;
  font-size: 12px;
}

.node-ports {
  position: relative;
  height: 0;
}

.port {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #4a90e2;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
}

.port-input {
  left: -6px;
  top: -30px;
}

.port-output {
  right: -6px;
  top: -30px;
}

.port:hover {
  background: #2d70c4;
  transform: scale(1.2);
}
</style>
