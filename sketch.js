var capture;
var button;
var button2;
var button3;
var booth;
var snapshots = [];
var counter = 0;
var myImage;
var film;
var rSlider, gSlider, bSlider;
var kodak;

function preload() {
  // put preload code here
  film = loadImage("./assets/film3.png");
  booth = loadImage("./assets/ok5.png");
  kodak = loadImage("./assets/rullino.png");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  background(51);

  // colorMode(HSB, 255);

  // create sliders
  // slider has a range between 0 and 255 with a starting value of 127
    rSlider = createSlider(0, 255, 217);
    rSlider.position((windowWidth / 5) , (windowHeight / 2) - 50 );
    gSlider = createSlider(0, 255, 78);
    gSlider.position((windowWidth / 5), (windowHeight / 2) -20 );
    bSlider = createSlider(0, 255, 44);
    bSlider.position((windowWidth / 5), (windowHeight / 2) + 10);


// slider = createSlider(0, 255, 127);
// slider.position(20, 300);

  capture = createCapture(VIDEO);
  capture.size(320, 240); //canvas completely filled

  button = createButton('Snap');
  button.position((windowWidth / 5)+ 50, (windowHeight / 2) + 90 );
  button.mousePressed(takesnap);
  capture.hide();

  button2 = createButton('Print');
  button2.position((windowWidth / 5)+ 50, (windowHeight / 2) + 180 );
  button2.mousePressed(printImage);

}

function takesnap() {
  var total = 4; //4 shots
  snapshots[counter] = capture.get();
  counter++;
  if (counter == total) {
    counter = 0;
  }
}

// //button print() salva solo il rullino come?
function printImage() {
  save('myCanvas.png');
}

function draw() {
  // put drawing code here

// Set the hue according to the slider
var r = rSlider.value();
var g = gSlider.value();
var b = bSlider.value();
background(r, g, b);
// text("Set a background color", 165, 35);

  //text
  var myText1 = 'ENTER THE PHOTO BOOTH';
  var myText2 = 'Pose up to 4 times!';
  var setColor= "Set a background color";
  var areYouReady = 'Say cheese!'
  var savePic = 'Print your photos!'

  push();
  fill('WHITE');
  textFont('Fjalla One');
  textStyle(BOLD);
  noStroke();
  textSize(30);
  textAlign(CENTER);
  text(myText1, windowWidth / 2, windowHeight / 8);
  textSize(20);
  text(myText2, windowWidth / 2, windowHeight / 6);
  pop();

  push();
  fill('WHITE');
  textFont('Fjalla One');
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(setColor, (windowWidth / 10) , (windowHeight / 2) );
  pop();

  push();
  fill('WHITE');
  textFont('Fjalla One');
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(areYouReady, (windowWidth / 10) , (windowHeight / 2) + 100  );
  pop();

  push();
  fill('WHITE');
  textFont('Fjalla One');
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(savePic, (windowWidth / 10) , (windowHeight / 2) + 190  );
  pop();

  //main camera
  push();
  imageMode(CENTER);
  var myImage = capture.loadPixels(); //grab all the pixels
  translate(width, 0); // move to far corner
  scale(-1.0, 1.0); // flip x-axis backwards
  image(myImage, windowWidth / 2, (windowHeight / 2)+10, (myImage.width)*1.5, (myImage.height)*1.5); //position, width and height
  pop();

  //booth
  push();
  imageMode(CENTER);
  image(booth, (windowWidth / 2)-55, (windowHeight / 2)+40, (booth.width)/4.5, (booth.height)/4.5);
  pop();

  //shots dimensions
  var w = 300; //horizontal
  var h = 225; //vertical
  var x = windowWidth - 300; //starting point
  var y = windowHeight / 8;

  push();
  image(film, x - 30, y - 20, 200, 630);
  pop();

  push();
  for (var i = 0; i < snapshots.length; i++) {
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x > windowWidth - 300) {
      x = windowWidth - 300;
      y = y + 125; //distance between the snapshots
    }
  }
  pop();

  //rullino
  push();
  imageMode(CENTER);
  image(kodak, x - 30, windowHeight-200, (kodak.width)/12, (kodak.height)/12);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
