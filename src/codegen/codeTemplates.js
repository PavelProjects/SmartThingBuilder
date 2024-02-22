const mainTemplate = `//Auto-generated code
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
  $ota_begin
  if (SmartThing.init($init_params)) {
    LOGGER.info("main", "SmartThing successfully initialized");
  } else {
    LOGGER.error("main", "Failed to init SmartThing!");
  }
  LOGGER.info("main", "Setup finished");
}
void loop() {
  $ota_handle//Your loop logic here
  delay(500);
}

void addStates() {$states}
void addSensors() {$sensors}
void addActions() {$actions}
void addConfigEntries() {$configs}
`

const stateTemplate = `  SmartThing.addDeviceState("$name", []() {
    return ""; //TODO your logic here
  });`

const digitalSensorTemplate = `  SmartThing.addDigitalSensor("$name", $pin_name);`;
const analogSensorTemplate = `  SmartThing.addAnalogSensor("$name", $pin_name);`;
const customSensorsTemplate = `  SmartThing.addSensor("$name", [](){
    return 0; //TODO your logic here
  });`

const actionTemplate = `  SmartThing.addActionHandler("$name", "$description", []() {
    // TODO your logic here
    return ActionResult(true);
  });`

const configEntryTemplate = `  SmartThing.addConfigEntry("$name", "$description", "$type");`

const pinDefineTemplate = `#define $pin_name $pin`

const otaBeginTemplate = `
  if (SmartThing.wifiConnected()) {
    ArduinoOTA.begin();
  }
`
const otaHandleTemplate = `if (SmartThing.wifiConnected()) {
    ArduinoOTA.handle();
  }
  `

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
}