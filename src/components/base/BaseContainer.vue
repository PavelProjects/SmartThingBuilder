<script>
export default {
  name: "BaseContainer",
  props: {
    vertical: {
      type: Boolean,
      default: () => false,
    },
    gap: {
      type: String,
      default: () => "var(--default-gap)",
    },
  },
  computed: {
    style() {
      return {
        display: "flex",
        "flex-direction": this.vertical ? "column" : "vertical",
        gap: this.gap,
      };
    },
  },
};
</script>

<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>
