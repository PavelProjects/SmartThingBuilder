<script>
export default {
  props: {
    name: String,
    caption: String,
    count: Number,
    currentTab: String,
  },
  emits: ["select"],
};
</script>

<template>
  <div
    class="tab"
    :class="{ selected: currentTab === name }"
    @click.stop="$emit('select', name)"
  >
    <p>{{ caption }}</p>
    <p v-if="count" class="counter">{{ count }}</p>
  </div>
</template>

<style scoped>
.tab {
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 2px;
}
.tab p {
  font-size: 18px;
}
.tab:hover {
  background-color: var(--color-background-soft);
}
.selected {
  background-color: var(--color-background-mute);
}
.counter {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 0px 5px;
}
</style>
