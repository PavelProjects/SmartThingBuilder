import { mainTemplate, actionTemplate, stateTemplate, digitalSensorTemplate, analogSensorTemplate, customSensorsTemplate, configEntryTemplate, pinDefineTemplate, otaBeginTemplate, otaHandleTemplate } from "./codeTemplates";

const generateCode = ({
  type = "", name = "",
  states = [],
  sensors = [],
  actions = [],
  configs = [],
  ota = true,
}) => {
  const statesBlock = states
    .filter(({ name }) => !!name)
    .map(({ name }) => stateTemplate.replace("$name", toSnakeCase(name)))
    .join("")

  const sensorsBlocks = []
  const pinsBlocks = []
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
      sensorsBlocks.push(
        template
          .replace("$name", toSnakeCase(name))
          .replace("$pin_name", pinName)
      )
      if (pin) {
        pinsBlocks.push(
          pinDefineTemplate
            .replace("$pin_name", pinName)
            .replace("$pin", pin)
        )
      }
    })

  const actionsBlock = actions
    .filter(({ name }) => !!name)
    .map(({ name, description }) => actionTemplate
      .replace("$name", toSnakeCase(name))
      .replace("$description", description || name)
    ).join("")
  
  const configsBlock = configs
    .filter(({ name }) => !!name)
    .map(({ name, description, type }) => configEntryTemplate
      .replace("$name", toSnakeCase(name))
      .replace("$description", description || name)
      .replace("$type", type || "string")
    ).join("")
  
  let template = mainTemplate
    .replace("$pins_define", pinsBlocks.length !== 0 ? '\n' + pinsBlocks.join("\n") + '\n' : '')
    .replace("$init_params", buildInitParams(type, name))
    .replace("$states", statesBlock)
    .replace("$sensors", sensorsBlocks.join(""))
    .replace("$actions", actionsBlock)
    .replace("$config_entries", configsBlock)

    template = includeOta(template, ota)

  return template
}

const toSnakeCase = (value) => {
  if (!value) {
    return "";
  }
  return value.trim().toLowerCase().replaceAll(" ", "_")
}

const buildInitParams = (type, name) => {
  let v = `"${toSnakeCase(type)}"`;
  if (!name) {
    return v;
  }
  return `${v}, "${toSnakeCase(name)}"`
}

const includeOta = (template, withOta) => {
  if (withOta) {
    return template.replace("$ota_include", "#include <ArduinoOTA.h>\n")
      .replace("$ota_begin", otaBeginTemplate)
      .replace("$ota_handle", otaHandleTemplate)
  } else {
    return template.replace("$ota_include", "")
      .replace("$ota_begin", "")
      .replace("$ota_handle", "")
  }
}

export { generateCode }