<script>
import { useCodeComponentsStore } from "@/stores/useCodeComponentsStore";
import BaseContainer from "./base/BaseContainer.vue";
import ModalDialog from "./base/ModalDialog.vue";

export default {
  name: "ExportDialog",
  components: {
    BaseContainer,
    ModalDialog,
  },
  props: {
    open: Boolean,
  },
  emits: ["close"],
  data() {
    const store = useCodeComponentsStore();
    return { store };
  },
};
</script>

<template>
  <ModalDialog id="export-dialog" :open="open" @close="() => $emit('close')">
    <BaseContainer :vertical="true" class="export-dialog">
      <header>Поделиться конфигурацией</header>
      <textarea class="export-area" :value="store.export()"></textarea>
    </BaseContainer>
  </ModalDialog>
</template>

<style lang="css" scoped>
.export-dialog {
  padding: var(--default-padding);
}
.export-area {
  height: 70vh;
}
</style>
