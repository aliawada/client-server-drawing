var socket;

function setup() {
  createCanvas(1600, 800);
  background(51);

  socket = io.connect("https://6969-a2daf590-ffa2-4731-95bb-615085e91e4b.ws-us1.gitpod.io");

  socket.color = getRandomColor();
  // receive
  socket.on('newCanvasWithData', newConnection);
  socket.on('mouse', newDrawing);
}

function newConnection(CanvasData) {
    console.log(CanvasData);

    for(i = 0; i < CanvasData.length; i++) {
        noStroke();
        fill(CanvasData[i].color.r, CanvasData[i].color.g, CanvasData[i].color.b);
        ellipse(CanvasData[i].x, CanvasData[i].y, 10, 10);
    }

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