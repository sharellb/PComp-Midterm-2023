const serial = new p5.WebSerial(); // set up serial constant
let portButton; // variable for port button
let ghosts = [];

let controlX;
let controlY;
let controlPressed = false;
let controlB;
let inputData;

// set up variables of loaded sounds
let idleSound;
let greenSound;
let purpleSound;
let orangeSound;
let currentSound;


function setup() {
  //set canvas to take up full screen
  createCanvas(windowWidth, windowHeight);
  
  logAction("Canvas created");

  
  loadSounds();
  setupSerial();
  // setMouseControls(); // set the control variable to be set to mouse values. Comment out when the joystick is attached. TODO: add check for data input or joystick
  currentSound = idleSound; // set idleSound as default in setup to play
  
  for (var i = 0; i < 10; i++) {
    ghosts.push(new Ghost());
  }
  
}

function loadSounds() {
  idleSound = loadSound(IDLE_SOUND_PATH); 
  greenSound = loadSound(GREEN_SOUND_PATH);
  orangeSound = loadSound(ORANGE_SOUND_PATH);
  purpleSound = loadSound(PURPLE_SOUND_PATH);
}

function setMouseControls() {
  // if mouse is present set control to be X, otherwise set it to the middle of the canvas
  
  controlX = mouseX || width / 2; 
  controlY = mouseY || height / 2;
  // logAction(`controlX and controlY set to ${controlX} and ${controlY}`);
  controlPressed = mouseIsPressed; // set control pressed boolean to match mouseIsPressed for setup 
  
  // logAction(`controlPressed set to ${controlPressed}`);
}

function draw() {
  if (controlY && controlX) {
    background(controlY /10, controlX / 10, controlY + controlX / 20); 
  } else {
    background("black");
  }
  
  displayText(); 
  displayGhosts();
  
  if (inputData) {
    checkInput(inputData);
  }
  
}



function checkInput(inputData) {
  let data = parseInputData(inputData);

  handleJoystickMove(data.joystickX, data.joystickY, data.joystickB);
  handleJoystickPress(data.joystickB);
}

function handleJoystickPress(newPress) {
  if (newPress === 1 && !currentSound.isPlaying()) {
    greenSound.play(); 
  }
}

function handleJoystickMove(posX, posY, buttonVal) {
  controlX = posX;
  controlY = posY;
  controlB = buttonVal;
  // logAction(` ${posX} ${posY}`);
}

  
function parseInputData(inpugtData) {
  return JSON.parse(inputData);
}

function displayText() {
  textAlign(CENTER);
  fill("#FFF");
  
  displayTitle();
  displayInstructions();
  
  // logAction("displayText");
}

function displayTitle() {
  push();
  textSize(32);
  text(TITLE, width/ 2, height/ 20);
  pop();
  
  // logAction("displayedTitle");
}

function displayInstructions() {
  push();
  textSize(20);
  text(INSTRUCTIONS, width/ 2, (height / 20) + 50);
  pop();
  
  // logAction("displayInstructions");
}

// function playSound(loadedSound) {
//   if (loadedSound && !loadedSound.isPlaying()) {
//     loadedSound.play();
//   } 
// }

// function pauseSound(loadedSound) {
//   logAction("sound paused");
//   if (loadedSound && loadedSound.isPlaying()) {
//     loadedSound.pause();
//   }
// }


// log action to console
function logAction(action) {
  console.log(`Action: ${ action }`)
}


/////SERIAL CONNECTIONS//////


// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):
function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  // // check to see that there's actually a string there:
  if (inString) {
    inputData = inString;
  }
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

function closePort() {
  serial.close();
}

function setupSerial() {
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  // add serial connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
}

function displayGhosts() {
  for (const ghost of ghosts) {
    ghost.moveAndDraw();
  }
}


// This class keeps track of all the variables and functions
// we need for one ghost. By creating multiple *instances*
// of this class, we can fill our screen with ghosts!
class Ghost {

  constructor() {

    this.tail = [];
    this.tailLength = 30;

    // Give this ghost a random size and starting position.
    this.ghostSize = random(10, 100);
    this.ghostX = random(width);
    this.ghostY = random(height);

    // These variables are used to make the ghosts
    // follow different paths.
    // Try changing these numbers!
    this.cosOffset = random(100);
    this.wiggliness = random(2, 10);
    this.floatiness = random(2, 10);
    

    // Give this ghost a random color.
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  moveAndDraw() {

    // Move the ghost left and right.
    this.ghostX += cos((this.cosOffset + frameCount) / 10) * this.wiggliness;
    // Move the ghost up.
    this.ghostY -= this.floatiness;
    // If this ghost goes off the top, start it back at the bottom.
    if (this.ghostY < -this.ghostSize) {
      this.ghostY = height + this.ghostSize;
    }

    // Add a point to the beginning of the array.
    this.tail.unshift({x: this.ghostX, y: this.ghostY});
    // If the array is too big, remove the last point.
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }


    // Loop over the tail and draw the points.
    for (let index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];

      // Tail gets smaller and more transparent.
      const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
      const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;

      fill(this.r, this.g, this.b, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize);
    }

    // Draw this ghost's face. O_O
    fill(32);
    ellipse(this.ghostX - this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX + this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX,
            this.ghostY + this.ghostSize * .2,
            this.ghostSize * .2);
  }
}
