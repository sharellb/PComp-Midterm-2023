const serial = new p5.WebSerial(); // set up serial constant
let portButton; // variable for port button
let inData; // variable to hold data

function setup() {
  createCanvas(400, 400);
  
  // // check for browser compatibility
  // if (!navigator.serial) {
  //   alert("WebSerial is not supported in this browser.");
  // }
  
  // // if serial is available, add event listeners for connect/disconnect
  
  // navigator.serial.addEventListener("connect", portConnect);
  // navigator.serial.addEventListener("disconnect", portDisconnect);
  
  // // check for available ports
  // serial.getPorts();
  
  // //if there's no port chosen, choose:
  // serial.on("noport", makePortButton);
  // serial.on("portavailable", openPort);
  // serial.on("requesterror", portError);
  // serial.on("data", serialEvent);
  // serial.on("close", makePortButton);
}

function draw() {
  // if (inData) {
  //   background(parseInt(inData)); // set background by potentiometer and parse string to integer
  // }

  background(200);
}

// // Serial Commiunications CALLBACKS
// // if there's no port selected, 
// // make a port select button appear:
// function makePortButton() {
//   // create and position a port chooser button:
//   portButton = createButton("choose port");
//   portButton.position(10, 10);
//   // give the port button a mousepressed handler:
//   portButton.mousePressed(choosePort);
// }
 
// // make the port selector window appear:
// function choosePort() {
//   if (portButton) portButton.show();
//   serial.requestPort();
// }
 
// // open the selected port, and make the port 
// // button invisible:
// function openPort() {
//   // wait for the serial.open promise to return,
//   // then call the initiateSerial function
//   serial.open().then(initiateSerial);
 
//   // once the port opens, let the user know:
//   function initiateSerial() {
//     console.log("port open");
//   }
//   // hide the port button once a port is chosen:
//   if (portButton) portButton.hide();
// }
 
// // pop up an alert if there's a port error:
// function portError(err) {
//   alert("Serial port error: " + err);
// }
// // read any incoming data as a string
// // (assumes a newline at the end of it):
// function serialEvent() {
//   inData = serial.readLine();
// }
 
// // try to connect if a new serial port 
// // gets added (i.e. plugged in via USB):
// function portConnect() {
//   console.log("port connected");
//   serial.getPorts();
// }
 
// // if a port is disconnected:
// function portDisconnect() {
//   serial.close();
//   console.log("port disconnected");
// }
 
// function closePort() {
//   serial.close();

// }