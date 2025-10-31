<template>
  <svg class="workflow-connection" :style="svgStyle">
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <polygon points="0 0, 10 3, 0 6" fill="#4a90e2" />
      </marker>
    </defs>
    <path
      :d="pathData"
      :stroke="strokeColor"
      stroke-width="2"
      fill="none"
      marker-end="url(#arrowhead)"
      @click="handleClick"
    />
  </svg>
</template>

<script>
export default {
  name: 'WorkflowConnection',
  props: {
    startX: {
      type: Number,
      required: true
    },
    startY: {
      type: Number,
      required: true
    },
    endX: {
      type: Number,
      required: true
    },
    endY: {
      type: Number,
      required: true
    },
    connection: {
      type: Object,
      default: null
    },
    color: {
      type: String,
      default: '#4a90e2'
    }
  },
  emits: ['click'],
  computed: {
    svgStyle() {
      const minX = Math.min(this.startX, this.endX);
      const minY = Math.min(this.startY, this.endY);
      const maxX = Math.max(this.startX, this.endX);
      const maxY = Math.max(this.startY, this.endY);
      
      return {
        position: 'absolute',
        left: `${minX - 10}px`,
        top: `${minY - 10}px`,
        width: `${maxX - minX + 20}px`,
        height: `${maxY - minY + 20}px`
      };
    },
    pathData() {
      const minX = Math.min(this.startX, this.endX);
      const minY = Math.min(this.startY, this.endY);
      
      const x1 = this.startX - minX + 10;
      const y1 = this.startY - minY + 10;
      const x2 = this.endX - minX + 10;
      const y2 = this.endY - minY + 10;
      
      const dx = x2 - x1;
      const dy = y2 - y1;
      
      // Bezier curve control points
      const cx1 = x1 + dx * 0.5;
      const cy1 = y1;
      const cx2 = x2 - dx * 0.5;
      const cy2 = y2;
      
      return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
    },
    strokeColor() {
      return this.color;
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', { connection: this.connection, event });
    }
  }
};
</script>

<style scoped>
.workflow-connection {
  overflow: visible;
  z-index: 0;
}

.workflow-connection path {
  pointer-events: stroke;
  cursor: pointer;
}

.workflow-connection path:hover {
  stroke-width: 3;
}
</style>
