import { actionTemplate, analogSensorTemplate, configEntryTemplate, customSensorsTemplate, digitalSensorTemplate, mainTemplate, otaBeginTemplate, otaHandleTemplate, pinDefineTemplate, stateTemplate } from "./codeTemplates"

const actionsBuilder = ({ actions }) => {
  return actions
    .filter(({ name }) => !!name)
    .map(({ name, description }) => actionTemplate
      .replace("$name", toSnakeCase(name))
      .replace("$description", description || name)
    )
}

const sensorsBuilder = ({ sensors, pins }) => {
  const blocks = []
  sensors.filter(({ name }) => !!name)
    .forEach(({ name, pin, type }) => {
      const pinName = toSnakeCase(name).toUpperCase() + "_PIN"

      let template = "";
      switch(type) {
        case "digital":
          template = digitalSensorTemplate
          break
        case "analog":
          template = analogSensorTemplate
          break
        default:
          template = customSensorsTemplate
      }
      blocks.push(
        template
          .replace("$name", toSnakeCase(name))
          .replace("$pin_name", pinName)
      )
      if (pin || pin === 0) {
        pins[pin] = pinName
      }
    })
  return blocks
}

const statesBuilder = ({ states }) => {
  return states
    .filter(({ name }) => !!name)
    .map(({ name }) => stateTemplate.replace("$name", toSnakeCase(name)))
}

const configsBuilder = ({ configs }) => {
  return configs
    .filter(({ name }) => !!name)
    .map(({ name, description, type }) => configEntryTemplate
      .replace("$name", toSnakeCase(name))
      .replace("$description", description || name)
      .replace("$type", type || "string")
    )
}

const pinsBuilder = ({ pins }) => {
  return Object.entries(pins).map(([pin, name]) => 
    pinDefineTemplate
      .replace("$pin_name", name)
      .replace("$pin", pin)
  )
}

const otaBuilder = ({ ota }) => {
  if (ota) {
    return {
      "include": "#include <ArduinoOTA.h>\n",
      "begin": otaBeginTemplate,
      "handle": otaHandleTemplate,
    }
  } else {
    return {
      "include": "",
      "begin": "",
      "handle": "",
    }
  }
}

const initParamsBuilder = ({ type, name }) => {
  let v = `"${toSnakeCase(type)}"`;
  if (!name) {
    return v;
  }
  return `${v}, "${toSnakeCase(name)}"`
}

const builders = {
  "actions": actionsBuilder,
  "sensors": sensorsBuilder,
  "states": statesBuilder,
  "configs": configsBuilder,
  "pins": pinsBuilder,
  "init_params": initParamsBuilder,
  "ota": otaBuilder,
}

const generateCode = (store) => {
  const context = {
    pins: {},
    ...store
  }
  let template = mainTemplate
  Object.entries(builders).forEach(([name, builder]) => {
    const result = builder(context)
    if (Array.isArray(result)) {
      template = template.replace("$" + name, result.length === 0 ? '' : '\n' + result.join("\n") + '\n')
    } else if (result instanceof Object) {
      Object.entries(result).forEach(([key, value]) => 
        template = template.replace(`\$${name}_${key}`, value)
      )
    } else if (typeof(result) === 'string'){
      template = template.replace("$" + name, result)
    } else {
      template = template.replace("$" + name, '')
    }
  })
  return template
}

const toSnakeCase = (value) => {
  if (!value) {
    return "";
  }
  return value.trim().toLowerCase().replaceAll(" ", "_")
}

export { generateCode }