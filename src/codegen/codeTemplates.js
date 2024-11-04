const mainTemplate = `//Auto-generated code
#include <Arduino.h>
#include <SmartThing.h>
$ota_include$pins
void addStates();
void addSensors();
void addActions();
void addConfigEntries();

void setup() {
  addStates();
  addSensors();
  addActions();
  addConfigEntries();
  
  if (SmartThing.init($init_params)) {
    LOGGER.info("main", "SmartThing successfully initialized");
  } else {
    LOGGER.error("main", "Failed to init SmartThing!");
  }
  $ota_begin
  LOGGER.info("main", "Setup finished");
}
void loop() {
  $ota_handle//Your loop logic here
  delay(500);
}

void addActions() {$actions}
void addSensors() {$sensors}
void addStates() {$states}
void addConfigEntries() {$configs}
`;

const urLogicTemplate = "//TODO your logic here";

const stateTemplate = `  ObservablesManager.addDeviceState("$name", []() {
    return ""; ${urLogicTemplate}
  });`;

const digitalSensorTemplate = `  ObservablesManager.addDigitalSensor("$name", $pin_name);`;
const analogSensorTemplate = `  ObservablesManager.addAnalogSensor("$name", $pin_name);`;
const customSensorsTemplate = `  ObservablesManager.addSensor("$name", [](){
    return 0; ${urLogicTemplate}
  });`;

const actionTemplate = `  ActionsManager.add("$name", "$caption", []() {
    $logic
    return ActionResult(true);
  });`;

const configEntryTemplate = `  SettingsRepository.addConfigEntry("$name", "$caption", $type);`;
const configEntryType = {
  string: "CONFIG_STRING",
  integer: "CONFIG_INTEGER",
  boolen: "CONFIG_BOOLEAN"
}

const pinDefineTemplate = `#define $pin_name $pin`;

const otaBeginTemplate = `
  if (SmartThing.wifiConnected()) {
    ArduinoOTA.begin();
  }
`;
const otaHandleTemplate = `if (SmartThing.wifiConnected()) {
    ArduinoOTA.handle();
  }
  `;

export {
  mainTemplate,
  actionTemplate,
  analogSensorTemplate,
  digitalSensorTemplate,
  customSensorsTemplate,
  stateTemplate,
  configEntryTemplate,
  configEntryType,
  pinDefineTemplate,
  otaBeginTemplate,
  otaHandleTemplate,
  urLogicTemplate,
};
