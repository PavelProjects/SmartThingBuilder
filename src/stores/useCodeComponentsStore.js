import _ from "lodash";
import { defineStore } from "pinia";

const canAdd = (list) => {
  if (list.length === 0) {
    return true
  }
  return !!list[list.length - 1].name
}

const addIfPossible = (list, item) => {
  if (canAdd(list)) {
    list.unshift(item)
  }
}

const initState = {
  type: "test_device",
  name: "",
  states: [],
  sensors: [],
  actions: [],
  configs: [],
  ota: false,
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
  getters: {
    haveChanges: ({ type, name, states, sensors, actions, configs, ota }) => {
      return !_.isEqual(
        { type, name, states, sensors, actions, configs, ota },
        initState
      );
    }
  },
  actions: {
    export() {
      return JSON.stringify(this.$state, null, 2)
    },
    import(json) {
      this.$state = JSON.parse(json)
    },
    setName(value) {
      this.name = value
    },
    setType(value) {
      this.type = value
    },
    addAction() {
      addIfPossible(this.actions, { 
        name: undefined,
        caption: undefined,
      })
    },
    addActionLogic(index) {
      if (!this.actions[index]) {
        return
      }
      this.actions[index].logic = {
        type: "digital",
        pin: 0,
        value: 'HIGH',
      }
    },
    removeActionLogic(index) {
      if (!this.actions[index]) {
        return
      }
      delete this.actions[index].logic
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
        { name: undefined, caption: undefined, type: "string" }
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