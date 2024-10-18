import {
  actionTemplate,
  analogSensorTemplate,
  configEntryTemplate,
  customSensorsTemplate,
  digitalSensorTemplate,
  mainTemplate,
  otaBeginTemplate,
  otaHandleTemplate,
  pinDefineTemplate,
  stateTemplate,
  urLogicTemplate,
} from "./codeTemplates";

const actionLogicBuilder = (action, logic, pins) => {
  if (!logic) {
    return;
  }
  const { type, pin, value } = logic;
  if (!["digital", "analog"].includes(type) || (!pin && pin !== 0) || !value) {
    return;
  }
  const pinName = `ACTION_${action.toUpperCase()}_PIN`;
  pins[pinName] = pin;
  return `${type}Write(${pinName}, ${value})`;
};

const actionsBuilder = ({ actions, pins }) => {
  actions.forEach((action) => (action.systemName = toSnakeCase(action.name)));

  return actions
    .filter(({ name }) => !!name)
    .map(({ name, systemName, caption, logic }) =>
      actionTemplate
        .replace("$name", systemName)
        .replace("$caption", caption || name)
        .replace(
          "$logic",
          actionLogicBuilder(systemName, logic, pins) ?? urLogicTemplate,
        ),
    );
};

const sensorsBuilder = ({ sensors, pins }) => {
  const blocks = [];
  sensors
    .filter(({ name }) => !!name)
    .forEach(({ name, pin, type }) => {
      const systemName = toSnakeCase(name);
      const pinName = "SENSOR_" + systemName.toUpperCase() + "_PIN";

      let template = "";
      switch (type) {
        case "digital":
          template = digitalSensorTemplate;
          break;
        case "analog":
          template = analogSensorTemplate;
          break;
        default:
          template = customSensorsTemplate;
      }
      blocks.push(
        template.replace("$name", systemName).replace("$pin_name", pinName),
      );
      if (pin || pin === 0) {
        pins[pinName] = pin;
      }
    });
  return blocks;
};

const statesBuilder = ({ states }) => {
  return states
    .filter(({ name }) => !!name)
    .map(({ name }) => stateTemplate.replace("$name", toSnakeCase(name)));
};

const configsBuilder = ({ configs }) => {
  return configs
    .filter(({ name }) => !!name)
    .map(({ name, caption, type }) =>
      configEntryTemplate
        .replace("$name", toSnakeCase(name))
        .replace("$caption", caption || name)
        .replace("$type", type || "string"),
    );
};

const pinsBuilder = ({ pins }) => {
  return Object.entries(pins).map(([name, pin]) =>
    pinDefineTemplate.replace("$pin_name", name).replace("$pin", pin),
  );
};

const otaBuilder = ({ ota }) => {
  if (ota) {
    return {
      include: "#include <ArduinoOTA.h>\n",
      begin: otaBeginTemplate,
      handle: otaHandleTemplate,
    };
  } else {
    return {
      include: "",
      begin: "",
      handle: "",
    };
  }
};

const initParamsBuilder = ({ type, name }) => {
  let v = `"${toSnakeCase(type)}"`;
  if (!name) {
    return v;
  }
  return `${v}, "${toSnakeCase(name)}"`;
};

const builders = {
  actions: actionsBuilder,
  sensors: sensorsBuilder,
  states: statesBuilder,
  configs: configsBuilder,
  pins: pinsBuilder,
  init_params: initParamsBuilder,
  ota: otaBuilder,
};

const generateCode = (store) => {
  const context = {
    pins: {},
    ...store,
  };
  let template = mainTemplate;
  Object.entries(builders).forEach(([name, builder]) => {
    const result = builder(context);
    if (Array.isArray(result)) {
      template = template.replace(
        "$" + name,
        result.length === 0 ? "" : "\n" + result.join("\n") + "\n",
      );
    } else if (result instanceof Object) {
      Object.entries(result).forEach(
        ([key, value]) =>
          (template = template.replace(`$${name}_${key}`, value)),
      );
    } else if (typeof result === "string") {
      template = template.replace("$" + name, result);
    } else {
      template = template.replace("$" + name, "");
    }
  });
  return template;
};

const toSnakeCase = (value) => {
  if (!value) {
    return "";
  }
  return value.trim().toLowerCase().replaceAll(" ", "_");
};

export { generateCode };
