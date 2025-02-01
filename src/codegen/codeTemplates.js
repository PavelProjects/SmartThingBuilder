const mainTemplate = `//Auto-generated code
#include <Arduino.h>
#include <SmartThing.h>
$pins
void addSensors();
void addActions();
void addConfigEntries();

void setup() {
  addSensors();
  addActions();
  addConfigEntries();
  
  if (SmartThing.init($init_params)) {
    st_log_info("main", "SmartThing successfully initialized");
  } else {
    st_log_error("main", "Failed to init SmartThing!");
  }
  st_log_info("main", "Setup finished");
}
void loop() {
  //Your loop logic here
  delay(200);
}

void addActions() {$actions}
void addSensors() {$sensors}
void addConfigEntries() {$configs}
`;

const urLogicTemplate = "//TODO your logic here";

const digitalSensorTemplate = `  SensorsManager.addDigital("$name", $pin_name);`;
const analogSensorTemplate = `  SensorsManager.addAnalog("$name", $pin_name);`;
const customSensorsTemplate = `  SensorsManager.add("$name", [](){
    return 0; ${urLogicTemplate}
  });`;

const actionTemplate = `  ActionsManager.add("$name", "$caption", []() {
    $logic
    return true;
  });`;

const configEntryTemplate = `  ConfigManager.add("$name");`;

const pinDefineTemplate = `#define $pin_name $pin`;

export {
  mainTemplate,
  actionTemplate,
  analogSensorTemplate,
  digitalSensorTemplate,
  customSensorsTemplate,
  configEntryTemplate,
  pinDefineTemplate,
  urLogicTemplate,
};
