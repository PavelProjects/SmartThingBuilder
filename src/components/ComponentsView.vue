<script>
import ActionsView from "./ActionsView.vue";
import SensorsView from "./SensorsView.vue";
import StatesView from "./StatesView.vue";
import ConfigsView from "./ConfigsView.vue";
import InfoView from "./InfoView.vue";
import TabItem from "./common/TabItem.vue";
import ExportSvg from "vue-material-design-icons/Export.vue";
import ImportSvg from "vue-material-design-icons/Import.vue";
import { useCodeComponentsStore } from "@/stores/useCodeComponentsStore";
import { storeToRefs } from "pinia";
import PopUpDialog from "./PopUpDialog.vue";

export default {
  components: {
    ActionsView,
    SensorsView,
    StatesView,
    ConfigsView,
    InfoView,
    TabItem,
    ExportSvg,
    ImportSvg,
    PopUpDialog,
  },
  data() {
    const store = useCodeComponentsStore();
    const { haveChanges } = storeToRefs(store);
    return {
      tab: "info",
      haveChanges,
      store,
      mode: undefined,
      jsonConfig: undefined,
      validationError: undefined,
    };
  },
  methods: {
    handleTabSelect(name) {
      this.tab = name;
    },
    importConfig() {
      this.validationError = "";
      try {
        this.store.import(this.jsonConfig);
        this.mode = undefined;
      } catch (error) {
        console.error(error);
        this.validationError = `Ошибка парсинга: ${error.message}`;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="tabs">
      <TabItem
        name="info"
        caption="Информация"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="actions"
        caption="Действия"
        :count="store.actions.length"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="sensors"
        caption="Сенсоры"
        :count="store.sensors.length"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="states"
        caption="Состояния"
        :count="store.states.length"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="configs"
        caption="Конфигурации"
        :count="store.configs.length"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <ExportSvg
        v-if="haveChanges"
        class="icon"
        title="export"
        :size="30"
        @click="mode = 'export'"
      />
      <ImportSvg
        v-else
        class="icon"
        title="import"
        :size="30"
        @click="mode = 'import'"
      />
    </div>
    <div class="tab-view">
      <InfoView v-if="tab === 'info'" />
      <ActionsView v-if="tab === 'actions'" />
      <SensorsView v-if="tab === 'sensors'" />
      <StatesView v-if="tab === 'states'" />
      <ConfigsView v-if="tab === 'configs'" />
    </div>
    <PopUpDialog v-if="mode" @close="mode = undefined">
      <textarea v-if="mode === 'export'" :value="store.export()"></textarea>
      <div v-else class="import-dialog">
        <textarea
          v-model="jsonConfig"
          placeholder="Скопируйте сюда json конфигурации"
        ></textarea>
        <h2 class="validation-error">{{ validationError }}</h2>
        <button v-if="jsonConfig" class="btn" @click.stop="importConfig">
          <h2>Импортировать</h2>
        </button>
      </div>
    </PopUpDialog>
  </div>
</template>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
}
.tabs {
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
  width: fit-content;
  margin: 0 auto;
}
.tab-view {
  padding: 5px;
  max-height: calc(100vh - 56px);
  overflow-y: auto;
  overflow-x: hidden;
}
.icon {
  cursor: pointer;
  height: 25px;
  margin: auto;
}
.dialog textarea {
  min-width: 800px;
  min-height: 400px;
  width: 50vw;
  height: 60vh;
  resize: none;
}
.import-dialog {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.validation-error {
  text-align: center;
  color: var(--color-danger);
}
</style>
