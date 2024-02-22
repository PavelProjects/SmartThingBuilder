import { defineStore } from "pinia";

const canAdd = (list) => {
  if (list.length === 0) {
    return true
  }
  return !!list[list.length - 1].name
}

const addIfPossible = (list, item) => {
  if (canAdd(list)) {
    list.push(item)
  }
}

const useCodeComponentsStore = defineStore({
  id: 'code_comp',
  state: () => ({
    type: "test_device",
    name: "",
    states: [],
    sensors: [],
    actions: [],
    configs: [],
    ota: false,
  }),
  actions: {
    setName(value) {
      this.name = value
    },
    setType(value) {
      this.type = value
    },
    addAction() {
      addIfPossible(this.actions, { 
        name: undefined,
        description: undefined,
        logic: undefined
      })
    },
    removeAction(index) {
      this.actions.splice(index, 1)
    },
    addSensor() {
      addIfPossible(this.sensors, { name: undefined, pin: undefined, type: "digital" })
    },
    removeSensor(index) {
      this.sensors.splice(index, 1)
    },
    addState() {
      addIfPossible(this.states, { name: undefined })
    },
    removeState(index) {
      this.states.splice(index, 1)
    },
    addConfig() {
      addIfPossible(
        this.configs,
        { name: undefined, description: undefined, type: "string" }
      )
    },
    removeConfig(index) {
      this.configs.splice(index, 1)
    },
    setOta(value) {
      this.ota = value ?? false;
    }
  }
})

export { useCodeComponentsStore }