<script>
export default {
  name: "ModalDialog",
  emits: ["close"],
  props: {
    id: {
      type: String,
      default: () => String(Math.random()),
    },
    open: Boolean,
    size: {
      type: String,
      validator(value) {
        return ["small", "regular", "large"].includes(value);
      },
    },
  },
  data() {
    let width;
    switch (this.size) {
      case "small":
        width = 250;
        break;
      case "large":
        width = 550;
        break;
      default:
        width = 400;
    }

    return {
      width: width + "px",
    };
  },
  watch: {
    open(value) {
      if (value) {
        document.getElementById(this.id)?.showModal();
      } else {
        document.getElementById(this.id)?.close();
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <dialog
    :id="id"
    :open="open"
    @click.stop="closeDialog"
    @close="closeDialog"
    class="dialog-container"
  >
    <Transition name="fade-in">
      <div
        v-if="open"
        class="dialog-content"
        :style="{ width: width }"
        @click.stop="() => {}"
      >
        <slot></slot>
      </div>
    </Transition>
  </dialog>
</template>

<style scoped>
.dialog-container {
  margin: auto;
}
.dialog-content {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background-color: var(--color-background);
  box-shadow: var(--color-background) 0px 0px 20px 5px;
}
</style>
