<script>
export default {
  name: "LoadingButton",
  props: {
    testId: String,
    loading: Boolean,
    disabled: Boolean,
  },
  emits: ["click"],
  data() {
    return {
      pulse: false,
    };
  },
  watch: {
    loading(value) {
      if (value) {
        this.pulse = true;
      }
    },
  },
  computed: {
    style() {
      const style = {};
      if (this.disabled) {
        style["cursor"] = "not-allowed";
      }
      if (this.loading) {
        style["cursor"] = "wait";
      }
      if (this.pulse) {
        style["animation"] = "shadow-pulse 0.5s infinite alternate";
      }
      return style;
    },
  },
};
</script>

<template>
  <button
    class="base-button"
    :id="testId"
    :disabled="loading || disabled"
    :style="style"
    @animationiteration="
      () => {
        if (!loading) pulse = false;
      }
    "
    @click.stop="() => $emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  position: relative;
  background-color: var(--color-accent);
  border-color: transparent;
  border-radius: var(--border-radius);
  min-width: 90px;
  color: var(--color-text-button);
  user-select: none;
}

.base-button:hover {
  opacity: 0.5;
}
</style>
