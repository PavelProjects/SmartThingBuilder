<script>
import { useCodeComponentsStore } from "../stores/useCodeComponentsStore";
import ComponentView from "./ComponentView.vue";
import InputField from "./fields/InputField.vue";
import SelectField from "./fields/SelectField.vue";
import CompFieldsContainer from "./fields/CompFieldsContainer.vue";

export default {
  components: {
    ComponentView,
    InputField,
    SelectField,
    CompFieldsContainer,
  },
  data() {
    const compsStore = useCodeComponentsStore();
    return {
      sensors: compsStore.sensors,
      addSensor: compsStore.addSensor,
      removeSensor: compsStore.removeSensor,
      types: [{ value: "digital" }, { value: "analog" }, { value: "custom" }],
    };
  },
};
</script>

<template>
  <ComponentView :header="'Сенсоры'" @add="addSensor">
    <sensors>
      <CompFieldsContainer
        v-for="(sensor, index) of sensors"
        :key="index"
        @remove="removeSensor(index)"
      >
        <InputField
          label="Системное"
          v-model="sensor.name"
          placeholder="Введите системное имя"
          :required="true"
        />
        <SelectField label="Тип" v-model="sensor.type" :values="types" />
        <InputField
          v-if="sensor.type && sensor.type !== 'custom'"
          v-model="sensor.pin"
          label="Пин"
          placeholder="Введите номер пина"
          type="number"
          :required="true"
        />
      </CompFieldsContainer>
    </sensors>
  </ComponentView>
</template>

<style scoped>
sensors {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
