<script>
export default {
  props: {
    name: String,
    caption: String,
    currentTab: String,
  },
  emits: ["select"]
}
</script>

<template>
  <p 
    class="tab"
    :class="{selected: currentTab === name}"
    @click.stop="$emit('select', name)">
    {{ caption ?? name }}
  </p>
</template>

<style scoped>
  .tab {
    border-radius: 5px;
    padding: 2px;
    cursor: pointer;
    transition: 0.3s;
  }
  .tab:hover {
    background-color: var(--color-background-soft);
  }
  .selected {
    background-color: var(--color-background-mute);
  }
</style>