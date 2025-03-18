<script>
import BaseButton from "./base/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
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
      <BaseButton v-if="withAddButton" @click="handleButton">
        Добавить
      </BaseButton>
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
