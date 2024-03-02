<script>
import Delete from 'vue-material-design-icons/Delete.vue'

export default {
  components: {
    Delete
  },
  emits: ["remove"]
}
</script>

<template>
  <div class="container bordered">
    <div class="list">
      <slot></slot>
    </div>
    <div class="remove-button" @click="$emit('remove')">
      <Delete fillColor="var(--color-danger)"/>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 5px;
    flex: 1 0 auto;
  }
  .remove-button {
    background-color: var(--color-background-soft);
    border-radius: 0px 5px 5px 0px;
    cursor: pointer;
    margin: 1px;
    flex-wrap: wrap;
    display: flex;
    align-content: center;
  }
  .remove-button:hover {
    opacity: 0.5;
  }
</style>