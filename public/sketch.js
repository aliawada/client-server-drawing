var socket;

function setup() {
  createCanvas(1600, 800);
  background(51);

  socket = io.connect("http://localhost:6969");
  socket.color = getRandomColor();
  // receive
  socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(data.color.r, data.color.g, data.color.b);
  ellipse(data.x, data.y, 10, 10);
}

function draw() {

}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY,
    color: socket.color
  }
  // send
  socket.emit('mouse', data);

  noStroke();
  fill(socket.color.r, socket.color.g, socket.color.b);
  ellipse(mouseX, mouseY, 10, 10);
}

function getRandomColor() {
  var color = {
    r: (Math.floor(Math.random() * 256)),
    g: (Math.floor(Math.random() * 256)),
    b: (Math.floor(Math.random() * 256))
  }
  return color;
}