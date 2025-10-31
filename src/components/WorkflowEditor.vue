<template>
  <div class="workflow-editor" ref="editorContainer">
    <div 
      class="workflow-canvas"
      @mousedown="handleCanvasMouseDown"
      @mousemove="handleCanvasMouseMove"
      @mouseup="handleCanvasMouseUp"
      @click="handleCanvasClick"
    >
      <!-- Connections -->
      <WorkflowConnection
        v-for="(conn, index) in connections"
        :key="'conn-' + index"
        :startX="conn.startX"
        :startY="conn.startY"
        :endX="conn.endX"
        :endY="conn.endY"
        :connection="conn"
        @click="handleConnectionClick"
      />
      
      <!-- Temporary connection while dragging -->
      <WorkflowConnection
        v-if="tempConnection"
        :startX="tempConnection.startX"
        :startY="tempConnection.startY"
        :endX="tempConnection.endX"
        :endY="tempConnection.endY"
        :color="'#999'"
      />
      
      <!-- Nodes -->
      <WorkflowNode
        v-for="node in nodes"
        :key="node.id"
        :node="node"
        :showDelete="editable"
        @click="handleNodeClick"
        @delete="handleNodeDelete"
        @drag-start="handleNodeDragStart"
      >
        <template #default="{ node }">
          <slot name="node-content" :node="node">
            {{ node.content || '' }}
          </slot>
        </template>
      </WorkflowNode>
    </div>
  </div>
</template>

<script>
import WorkflowNode from './WorkflowNode.vue';
import WorkflowConnection from './WorkflowConnection.vue';

export default {
  name: 'WorkflowEditor',
  components: {
    WorkflowNode,
    WorkflowConnection
  },
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    connections: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'node-click',
    'node-delete',
    'node-move',
    'connection-click',
    'connection-create',
    'canvas-click',
    'update:nodes',
    'update:connections'
  ],
  data() {
    return {
      draggingNode: null,
      dragOffset: { x: 0, y: 0 },
      tempConnection: null,
      connectingFrom: null,
      sourceNodeId: null
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('node-click', data);
    },
    handleNodeDelete(node) {
      const newNodes = this.nodes.filter(n => n.id !== node.id);
      const newConnections = this.connections.filter(
        c => c.fromId !== node.id && c.toId !== node.id
      );
      
      this.$emit('update:nodes', newNodes);
      this.$emit('update:connections', newConnections);
      this.$emit('node-delete', node);
    },
    handleNodeDragStart({ node, event }) {
      if (!this.editable) return;
      
      this.draggingNode = node;
      const rect = event.target.getBoundingClientRect();
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      event.preventDefault();
    },
    handleCanvasMouseMove(event) {
      if (this.draggingNode) {
        const canvas = this.$refs.editorContainer;
        const rect = canvas.getBoundingClientRect();
        
        const newX = event.clientX - rect.left - this.dragOffset.x;
        const newY = event.clientY - rect.top - this.dragOffset.y;
        
        const newNodes = this.nodes.map(n => 
          n.id === this.draggingNode.id 
            ? { ...n, x: newX, y: newY }
            : n
        );
        
        this.$emit('update:nodes', newNodes);
      } else if (this.tempConnection) {
        const canvas = this.$refs.editorContainer;
        const rect = canvas.getBoundingClientRect();
        
        this.tempConnection.endX = event.clientX - rect.left;
        this.tempConnection.endY = event.clientY - rect.top;
      }
    },
    handleCanvasMouseUp(event) {
      if (this.draggingNode) {
        this.$emit('node-move', this.draggingNode);
        this.draggingNode = null;
      }
      
      if (this.tempConnection && this.sourceNodeId) {
        // Check if mouse up is on a valid input port
        const target = event.target;
        if (target.classList.contains('port') && target.dataset.port === 'input') {
          const nodeEl = target.closest('.workflow-node');
          if (nodeEl) {
            // Find the target node by matching position
            const nodeRect = nodeEl.getBoundingClientRect();
            const canvas = this.$refs.editorContainer;
            const canvasRect = canvas.getBoundingClientRect();
            const targetX = nodeRect.left - canvasRect.left;
            const targetY = nodeRect.top - canvasRect.top;
            
            // Find the node with matching position
            const targetNode = this.nodes.find(n => 
              Math.abs(n.x - targetX) < 5 && Math.abs(n.y - targetY) < 5
            );
            
            if (targetNode && targetNode.id !== this.sourceNodeId) {
              // Create new connection
              const newConnection = {
                fromId: this.sourceNodeId,
                toId: targetNode.id,
                startX: this.tempConnection.startX,
                startY: this.tempConnection.startY,
                endX: nodeRect.left - canvasRect.left,
                endY: nodeRect.top - canvasRect.top + nodeRect.height / 2
              };
              
              const newConnections = [...this.connections, newConnection];
              this.$emit('update:connections', newConnections);
              this.$emit('connection-create', newConnection);
            }
          }
        }
        
        this.tempConnection = null;
        this.connectingFrom = null;
        this.sourceNodeId = null;
      }
    },
    handleCanvasMouseDown(event) {
      // Check if clicking on a port to start connection
      const target = event.target;
      if (target.classList.contains('port') && target.dataset.port === 'output') {
        const nodeEl = target.closest('.workflow-node');
        if (nodeEl) {
          // Find which node this belongs to by matching position
          const nodeRect = nodeEl.getBoundingClientRect();
          const canvas = this.$refs.editorContainer;
          const canvasRect = canvas.getBoundingClientRect();
          const nodeX = nodeRect.left - canvasRect.left;
          const nodeY = nodeRect.top - canvasRect.top;
          
          // Find the node with matching position
          const sourceNode = this.nodes.find(n => 
            Math.abs(n.x - nodeX) < 5 && Math.abs(n.y - nodeY) < 5
          );
          
          if (sourceNode) {
            this.sourceNodeId = sourceNode.id;
            
            this.connectingFrom = {
              x: nodeRect.right - canvasRect.left,
              y: nodeRect.top - canvasRect.top + nodeRect.height / 2
            };
            
            this.tempConnection = {
              startX: this.connectingFrom.x,
              startY: this.connectingFrom.y,
              endX: event.clientX - canvasRect.left,
              endY: event.clientY - canvasRect.top
            };
          }
        }
      }
    },
    handleCanvasClick(event) {
      if (event.target.classList.contains('workflow-canvas')) {
        this.$emit('canvas-click', event);
      }
    },
    handleConnectionClick(data) {
      this.$emit('connection-click', data);
    }
  }
};
</script>

<style scoped>
.workflow-editor {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.workflow-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  background: #f5f5f5;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
