<script>
export default {
  props: {
    header: String,
    withAddButton: {
      type: Boolean,
      default: () => true,
    },
  },
  methods: {
    handleButton() {
      this.$emit("add");
    },
  },
};
</script>

<template>
  <div class="component-container bordered">
    <div class="title">
      <header>{{ header }}</header>
      <button v-if="withAddButton" @click.stop="handleButton" class="btn">
        <h2>Добавить</h2>
      </button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.component-container {
  display: flex;
  flex-direction: column;
  padding: 2px;
}
.content {
  padding: 2px;
}
.title {
  position: relative;
}
.title button {
  position: absolute;
  top: 2px;
  right: 2px;
  height: calc(100% - 4px);
}
</style>
