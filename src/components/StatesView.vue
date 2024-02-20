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
      states: compsStore.states,
      addState: compsStore.addState,
      removeState: compsStore.removeState,
    }
  }
}
</script>

<template>
  <ComponentView header="Состояния" @add="addState">
    <states>
      <h2 v-if="states.length === 0" style="text-align: center;">Нет состояний</h2>
      <CompFieldsContainer
        v-for="state, index of states"
        :key="index"
        @remove="removeState(index)"
      >
        <InputField
          label="Имя"
          placeholder="Введите имя"
          v-model="state.name"
          :required="true"
        />
      </CompFieldsContainer>
    </states>
  </ComponentView>
</template>

<style scoped>
  states {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>