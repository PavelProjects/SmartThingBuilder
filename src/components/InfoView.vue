<script>
import { useCodeComponentsStore } from "../stores/useCodeComponentsStore";
import ComponentView from "./ComponentView.vue";
import InputField from "./fields/InputField.vue";

export default {
  components: {
    ComponentView,
    InputField,
  },
  data() {
    const compsStore = useCodeComponentsStore();
    return {
      store: compsStore,
    };
  },
};
</script>

<template>
  <ComponentView header="Базовая информация" :withAddButton="false">
    <div class="info-container">
      <InputField
        label="Тип устройства"
        :modelValue="store.type"
        @update:modelValue="(v) => store.setType(v)"
        :required="true"
      />
      <InputField
        label="Имя устройства"
        :modelValue="store.name"
        @update:modelValue="(v) => store.setName(v)"
      />
    </div>
  </ComponentView>
</template>

<style scoped>
.info-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
