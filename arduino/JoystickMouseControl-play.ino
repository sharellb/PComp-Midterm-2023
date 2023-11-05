/*
  Modified from : JoystickMouseControl

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/JoystickMouseControl
    // https://github.com/juxtapix/PComp/blob/main/examples/005_Button/005_Button_bb.png
*/

// set pin numbers for joystick axes and pushButton:
const int joystickButton = 16;  // input pin for the mouse pushButton
const int pushButton1 = 2;  // the number of the pushbutton pin
const int pushButton2 = 3;  // the number of the pushbutton pin
const int pushButton3 = 4;  // the number of the pushbutton pin
const int xAxis = A0;       // joystick X axis
const int yAxis = A1;       // joystick Y axis
int responseDelay = 100;      // response delay of the mouse, in ms

// const int light = 4;

void setup() {
  pinMode(joystickButton, INPUT); // set mouse push button
  pinMode(pushButton1, INPUT);
  pinMode(pushButton2, INPUT);
  pinMode(pushButton3, INPUT);

  Serial.begin(9600); // initialize serial communications
  // pinMode(4, INPUT);

}

void loop() {
  // read and scale the two axes:
  int xSensor = analogRead(xAxis);
  int ySensor = analogRead(yAxis);
  int joystickPushSensor = digitalRead(joystickButton);
  int pushButton1Sensor = digitalRead(pushButton1);
  int pushButton2Sensor = digitalRead(pushButton2);
  int pushButton3Sensor = digitalRead(pushButton3);


  Serial.print("{");
  Serial.print(" \"joystickX\": ");
  Serial.print(xSensor);
  Serial.print(", \"joystickY\": ");
  Serial.print(ySensor);
  Serial.print(", \"joystickB\": ");
  Serial.print(joystickPushSensor);
  Serial.println("}");

  delay(200);
}
