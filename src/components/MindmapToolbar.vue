<template>
  <div class="mindmap-toolbar">
    <button @click="undo">Undo</button>
    <button @click="redo">Redo</button>
    <button @click="addNode">Add Node</button>
    <button @click="deleteNode">Delete Node</button>
  </div>
</template>

<script>
export default {
  name: 'MindmapToolbar',
  emits: ['undo', 'redo', 'add-node', 'delete-node'],
  methods: {
    undo() {
      this.$emit('undo');
    },
    redo() {
      this.$emit('redo');
    },
    addNode() {
      this.$emit('add-node');
    },
    deleteNode() {
      this.$emit('delete-node');
    },
  },
};
</script>

<style scoped>
.mindmap-toolbar {
  /* Styles for the toolbar */
}
</style>