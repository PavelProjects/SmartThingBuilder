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

const stateTemplate = `  SmartThing.addDeviceState("$name", []() {
    return ""; ${urLogicTemplate}
  });`;

const digitalSensorTemplate = `  SmartThing.addDigitalSensor("$name", $pin_name);`;
const analogSensorTemplate = `  SmartThing.addAnalogSensor("$name", $pin_name);`;
const customSensorsTemplate = `  SmartThing.addSensor("$name", [](){
    return 0; ${urLogicTemplate}
  });`;

const actionTemplate = `  ActionsManager.add("$name", "$caption", []() {
    $logic
    return ActionResult(true);
  });`;

const configEntryTemplate = `  SmartThing.addConfigEntry("$name", "$caption", "$type");`;

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
  pinDefineTemplate,
  otaBeginTemplate,
  otaHandleTemplate,
  urLogicTemplate,
};
