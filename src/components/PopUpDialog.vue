<script>
export default {
  name: "PopUpDialog",
  methods: {
    clickOutside() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <div class="overlay" @click.stop="clickOutside">
    <div class="dialog" @click.stop="() => {}">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-tilt);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog {
  width: fit-content;
  height: fit-content;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: var(--color-background-mute);
}
</style>
