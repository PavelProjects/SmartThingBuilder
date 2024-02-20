<script>
import ActionsView from "./ActionsView.vue";
import SensorsView from "./SensorsView.vue";
import StatesView from "./StatesView.vue";
import ConfigsView from "./ConfigsView.vue";
import InfoView from "./InfoView.vue";
import TabItem from './common/TabItem.vue';

export default {
  components: {
    ActionsView,
    SensorsView,
    StatesView,
    ConfigsView,
    InfoView,
    TabItem,
  },
  data() {
    return {
      tab: "info"
    }
  },
  methods: {
    handleTabSelect(name) {
      this.tab = name
    }
  }
}
</script>

<template>
  <div>
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
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="sensors"
        caption="Сенсоры"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="states"
        caption="Состояния"
        :currentTab="tab"
        @select="handleTabSelect"
      />
      <TabItem
        name="configs"
        caption="Конфигурации"
        :currentTab="tab"
        @select="handleTabSelect"
      />
    </div>
    <div class="tab-view">
      <InfoView v-if="tab === 'info'"/>
      <ActionsView v-if="tab === 'actions'" />
      <SensorsView v-if="tab === 'sensors'" />
      <StatesView v-if="tab === 'states'" />
      <ConfigsView v-if="tab === 'configs'" />
    </div>
  </div>
</template>

<style scoped>
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
    width: 800px;
    margin: 0 auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>