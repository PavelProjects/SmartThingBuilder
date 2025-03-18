<script>
import { useCodeComponentsStore } from "@/stores/useCodeComponentsStore";
import BaseButton from "./base/BaseButton.vue";
import BaseContainer from "./base/BaseContainer.vue";
import ModalDialog from "./base/ModalDialog.vue";

export default {
  name: "ImportDialog",
  components: {
    BaseButton,
    BaseContainer,
    ModalDialog,
  },
  props: {
    open: Boolean,
  },
  emits: ["close"],
  data() {
    const store = useCodeComponentsStore();
    return {
      store,
      jsonConfig: undefined,
      validationError: undefined,
    };
  },
  methods: {
    importConfig() {
      this.validationError = "";
      try {
        this.store.import(this.jsonConfig);
        this.$emit("close");
      } catch (error) {
        console.error(error);
        this.validationError = `Ошибка парсинга: ${error.message}`;
      }
    },
  },
};
</script>

<template>
  <ModalDialog id="import-dialog" :open="open" @close="() => $emit('close')">
    <BaseContainer class="import-dialog" :vertical="true">
      <header>Импорт конфигурации</header>
      <textarea
        class="import-area"
        v-model="jsonConfig"
        placeholder="Скопируйте сюда json конфигурацию"
      ></textarea>
      <p class="validation-error">{{ validationError }}</p>
      <BaseButton :disabled="!jsonConfig" @click="importConfig">
        <h2>Импортировать</h2>
      </BaseButton>
    </BaseContainer>
  </ModalDialog>
</template>

<style lang="css" scoped>
.import-dialog {
  padding: var(--default-padding);
}
.import-area {
  height: 30vh;
}
</style>
