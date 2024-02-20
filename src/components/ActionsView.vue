<script>
import { useCodeComponentsStore } from '../stores/useCodeComponentsStore'
import ComponentView from './ComponentView.vue'
import InputField from './fields/InputField.vue'
import CompFieldsContainer from './fields/CompFieldsContainer.vue'

export default {
  components: {
    ComponentView,
    InputField,
    CompFieldsContainer,
  },
  data() {
    const compsStore = useCodeComponentsStore()
    return {
      actions: compsStore.actions,
      addAction: compsStore.addAction,
      removeAction: compsStore.removeAction,
    }
  },
}
</script>

<template>
  <ComponentView :header="'Действия'" @add="addAction">
    <actions>
      <h2 v-if="actions.length === 0" style="text-align: center;">Нет действий</h2>
      <CompFieldsContainer 
        v-for="action, index of actions"
        :key="index"
        @remove="removeAction(index)"
      >
        <InputField
          label="Системное имя"
          v-model="action.name"
          placeholder="Введите системное имя"
          :required="true"
        />
        <InputField 
          label="Название"
          v-model="action.description"
          placeholder="Введите название"
        />
      </CompFieldsContainer>
    </actions>
  </ComponentView>
</template>

<style scoped>
  actions-container {
    display: flex;
    flex-direction: column;
    padding: 2px;
    height: fit-content;
  }
  actions {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>