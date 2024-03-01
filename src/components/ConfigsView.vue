<script>
import { useCodeComponentsStore } from '../stores/useCodeComponentsStore'
import ComponentView from './ComponentView.vue'
import InputField from './fields/InputField.vue'
import SelectField from './fields/SelectField.vue'
import CompFieldsContainer from './fields/CompFieldsContainer.vue'

export default {
  components: {
    ComponentView,
    InputField,
    SelectField,
    CompFieldsContainer,
  },
  data() {
    const compsStore = useCodeComponentsStore()
    return {
      configs: compsStore.configs,
      addConfig: compsStore.addConfig,
      removeConfig: compsStore.removeConfig,
      types: [
        { value: "number" },
        { value: "string" },
        { value: "boolean" },
      ]
    }
  }
}
</script>

<template>
  <ComponentView header="Конфигурации" @add="addConfig">
    <configs>
      <h2 v-if="configs.length === 0" style="text-align: center;">Нет конфигураций</h2>
      <CompFieldsContainer
        v-for="config, index of configs"
        :key="index"
        @remove="removeConfig(index)"
      >
        <InputField
          label="Системное имя"
          placeholder="Введите cистемное имя"
          v-model="config.name"
          :required="true"
        />
        <InputField
          label="Название"
          placeholder="Введите название"
          v-model="config.caption"
        />
        <SelectField 
          label="Тип"
          v-model="config.type"
          :values="types"
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