function getvals() {
  let initlength = +document.getElementById("initlength").value;
  let lengthscale = +document.getElementById("length").value;
  let theta = +document.getElementById("theta").value;
  theta = theta*2*Math.PI/360;
  let thetascale = +document.getElementById("thetascale").value;
  let iterations = +document.getElementById("iterations").value;
  
  drawtree(initlength, lengthscale, Math.PI/2, theta, thetascale, iterations);
}

function drawtree(initlength, lengthscale, inittheta, thetachange, thetascale, iterations) {
  let canvas = document.getElementById("fractalmap");
  let drawer = canvas.getContext("2d");
  
  drawer.clearRect(0,0,canvas.width,canvas.height);
  let initcoord = { x: canvas.width/2, y: canvas.height };
  
  drawer.beginPath();
  drawbranch(canvas, drawer, initcoord, initlength, lengthscale, inittheta, thetachange, thetascale, iterations);
  drawer.closePath();
  
  drawer.stroke();
}

function drawbranch(canvas, drawer, coordinate, length, lengthscale, theta, thetachange, thetascale, iterations) {
  if(iterations <= 0) {
    return false;
  }
  
  drawer.moveTo(coordinate.x, coordinate.y);
  let radius = length*canvas.height;
  let newcoord = {
    x: coordinate.x+radius*Math.cos(theta),
    y: coordinate.y-radius*Math.sin(theta) };
  drawer.lineTo(newcoord.x, newcoord.y);
  drawbranch(canvas, drawer, newcoord, length*lengthscale, lengthscale, 
             theta+thetachange, thetachange*thetascale, thetascale, iterations-1);
  drawbranch(canvas, drawer, newcoord, length*lengthscale, lengthscale, 
             theta-thetachange, thetachange*thetascale, thetascale, iterations-1);
}

function aniframe() {
  animater.valarray[animater.anivalue] += animater.step;
  if(animater.valarray[animater.anivalue] > animater.maxi) {
    animater.valarray[animater.anivalue] = animater.mini;
  }
  
  drawtree(animater.valarray[0], animater.valarray[1], Math.PI/2, animater.valarray[2], animater.valarray[3], animater.valarray[4]);
}

function animater() {
  animater.valarray = [];
  animater.valarray[0] = +document.getElementById("initlength").value;
  animater.valarray[1] = +document.getElementById("length").value;
  let theta = +document.getElementById("theta").value;
  animater.valarray[2] = theta*2*Math.PI/360;
  animater.valarray[3] = +document.getElementById("thetascale").value;
  animater.valarray[4] = +document.getElementById("iterations").value;
  animater.anivalue = +document.getElementById("anivalue").value;
  animater.mini = +document.getElementById("mini").value;
  animater.maxi = +document.getElementById("maxi").value;
  animater.step = +document.getElementById("step").value;
  let delay = +document.getElementById("delay").value;
  
  console.log(delay);
  animater.intervaler = setInterval(aniframe, delay);
}

function stop() {
  clearInterval(animater.intervaler);
}

function load() {
  console.log("hello");
  drawtree(1/2, .75, Math.PI/2, Math.PI/4, 1, 3);
  console.log("goodbye");
}

function start() {
  window.addEventListener("load", load());
}
