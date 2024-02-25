<script>
import { useCodeComponentsStore } from '../stores/useCodeComponentsStore'
import ComponentView from './ComponentView.vue'
import InputField from './fields/InputField.vue'
import CompFieldsContainer from './fields/CompFieldsContainer.vue'
import SelectField from './fields/SelectField.vue'
import CheckBoxField from './fields/CheckBoxField.vue'

export default {
  components: {
    ComponentView,
    CompFieldsContainer,
    SelectField,
    InputField,
    CheckBoxField,
},
  data() {
    const compsStore = useCodeComponentsStore()
    return {
      actions: compsStore.actions,
      addAction: compsStore.addAction,
      removeAction: compsStore.removeAction,
      addLogic: compsStore.addActionLogic,
      removeLogic: compsStore.removeActionLogic
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
          v-model="action.caption"
          placeholder="Введите название"
        />
        <CheckBoxField
          :modelValue="action.logic" 
          label="Добавить простую логику"
          @update:modelValue="(v) => v ? addLogic(index) : removeLogic(index)"
        />
        <div v-if="action.logic" class="action-logic">
          <span>На </span>
          <select v-model="action.logic.type">
            <option>digital</option>
            <option>analog</option>
          </select>
          <span> пин № </span>
          <input
            v-model="action.logic.pin"
            type="number"
            style="width: 50px;"
          />
          <span> подать </span>
          <select
            v-if="action.logic.type === 'digital'"
            v-model="action.logic.value"
          >
            <option>HIGH</option>
            <option>LOW</option>
          </select>
          <input
            v-if="action.logic.type === 'analog'"
            v-model="action.logic.value"
            type="number"
            style="width: 150px;"
            min="0"
            max="4096"
          />
        </div>
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
  .action-logic {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
  .action-logic * {
    flex: 1 0 auto;
    text-align: center;
  }
</style>