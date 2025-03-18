import _ from "lodash";
import { defineStore } from "pinia";

const canAdd = (list) => {
  if (list.length === 0) {
    return true;
  }
  return !list.find(({ name }) => !name);
};

const addIfPossible = (list, item) => {
  if (canAdd(list)) {
    list.unshift(item);
  }
};

const initState = {
  type: "test_device",
  name: "",
  sensors: [],
  actions: [],
  configs: [],
};

const useCodeComponentsStore = defineStore({
  id: "code_comp",
  state: () => _.cloneDeep(initState),
  getters: {
    haveChanges: ({ type, name, sensors, actions, configs }) => {
      return !_.isEqual({ type, name, sensors, actions, configs }, initState);
    },
  },
  actions: {
    export() {
      return JSON.stringify(
        {
          type: this.type,
          name: this.name,
          actions: this.actions.filter(({ name }) => !!name),
          sensors: this.sensors.filter(({ name, type, pin }) => {
            if (type === "custom") {
              return !!name;
            }
            return !!name && (pin === 0 || !!pin);
          }),
        },
        null,
        2,
      );
    },
    import(json) {
      const values = JSON.parse(json);
      this.$state = _.cloneDeep({
        ...initState,
        ..._.pick(values, ["type", "name", "actions", "sensors"]),
      });
    },
    setName(value) {
      this.name = value;
    },
    setType(value) {
      this.type = value;
    },
    addAction() {
      addIfPossible(this.actions, {
        name: undefined,
        caption: undefined,
      });
    },
    addActionLogic(index) {
      if (!this.actions[index]) {
        return;
      }
      this.actions[index].logic = {
        type: "digital",
        pin: 0,
        value: "HIGH",
      };
    },
    removeActionLogic(index) {
      if (!this.actions[index]) {
        return;
      }
      delete this.actions[index].logic;
    },
    removeAction(index) {
      this.actions.splice(index, 1);
    },
    addSensor() {
      addIfPossible(this.sensors, {
        name: undefined,
        pin: undefined,
      });
    },
    removeSensor(index) {
      this.sensors.splice(index, 1);
    },
    addConfig() {
      addIfPossible(this.configs, {
        name: undefined,
      });
    },
    removeConfig(index) {
      this.configs.splice(index, 1);
    },
  },
});

export { useCodeComponentsStore };
