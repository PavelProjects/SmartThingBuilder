<script>
import ActionsView from "./ActionsView.vue";
import SensorsView from "./SensorsView.vue";
import ConfigsView from "./ConfigsView.vue";
import InfoView from "./InfoView.vue";
import BaseContainer from "./base/BaseContainer.vue";
import BaseButton from "./base/BaseButton.vue";
import ImportDialog from "./ImportDialog.vue";
import ExportDialog from "./ExportDialog.vue";

export default {
  components: {
    ActionsView,
    SensorsView,
    ConfigsView,
    InfoView,
    BaseContainer,
    BaseButton,
    ImportDialog,
    ExportDialog,
  },
  data() {
    return {
      mode: undefined,
    };
  },
};
</script>

<template>
  <div class="components list">
    <BaseContainer class="header-container">
      <BaseButton @click="() => (mode = 'import')">
        <p>Импорт</p>
      </BaseButton>
      <header>Конфигурация</header>
      <BaseButton @click="() => (mode = 'export')">
        <p>Экспорт</p>
      </BaseButton>
    </BaseContainer>
    <div class="list" style="overflow-y: auto">
      <InfoView />
      <SensorsView />
      <ActionsView />
      <ConfigsView />
    </div>
    <ImportDialog :open="mode === 'import'" @close="() => (mode = undefined)" />
    <ExportDialog :open="mode === 'export'" @close="() => (mode = undefined)" />
  </div>
</template>

<style scoped>
.components {
  flex: 1 0 auto;
  height: 100%;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.header-container * {
  flex: 1 0 auto;
}
</style>
