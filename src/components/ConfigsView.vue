<script>
import { useCodeComponentsStore } from "../stores/useCodeComponentsStore";
import ComponentView from "./ComponentView.vue";
import InputField from "./fields/InputField.vue";
import CompFieldsContainer from "./fields/CompFieldsContainer.vue";

export default {
  components: {
    ComponentView,
    InputField,
    CompFieldsContainer,
  },
  data() {
    const compsStore = useCodeComponentsStore();

    return {
      configs: compsStore.configs,
      addConfig: compsStore.addConfig,
      removeConfig: compsStore.removeConfig,
    };
  },
};
</script>

<template>
  <ComponentView header="Конфигурации" @add="addConfig">
    <configs>
      <CompFieldsContainer
        v-for="(config, index) of configs"
        :key="index"
        @remove="removeConfig(index)"
      >
        <InputField
          label="Системное имя"
          placeholder="Введите cистемное имя"
          v-model="config.name"
          :required="true"
        />
      </CompFieldsContainer>
    </configs>
  </ComponentView>
</template>

<style scoped>
configs {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
