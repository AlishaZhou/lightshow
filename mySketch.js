//point maping array
let mirror;
//number of points
let n = 125;

//refraction vars
let rotY;
let r1, r2;
const r = 1.52;

function setup() {
var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("mySketchGame");
  mirror = new Mirror();
    frameRate(60); // Cap frame rate
  
  // Add a set of points into the system
  for (let i = 0; i < n; i++) {
    let p = new Point(random(width), random(height));
    mirror.addPoint(p);
    noCursor();
  }
}
function myFunction() {
  var x = document.getElementById("panel");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

class Mirror{
  constructor(){
    this.points = [];
  }
  run(){
    for (let pt of this.points){
      pt.run(this.points);
    }
  }
  addPoint(p){
    this.points.push(p);
  }
}


function draw() {
  clear();
  blendMode(ADD);
  background(0);
  mirror.run();
  
  //custom cursor
  strokeWeight(0);
  circle(mouseX, mouseY, 25);
}


class Point{
  constructor(x, y){
    this.position = createVector(x, y);
    this.color = color(random(255), random(255), random(255), random(150, 200));
    this.color2 = color(random(255), random(255), random(255), random(100, 150));
    this.color3 = color(random(255), random(255), random(255), random(150));
    this.size = random((width + height)/100, (width + height)/50);
    
    }
    
  run(points){
    this.mirror(points);
    this.displayCircles();
  }
  
  displayCircles(){
    push();
    translate(this.position.x, this.position.y);
    for (let i = 0; i < n/5; i ++){
      if (i === n/5) {break; }
      strokeWeight(1);
      fill(this.color3);
      stroke(this.color3);
      circle(0, 0, this.size/i);
    }
    pop();
  }
  
  mirror(points){
    let refraction = this.refraction(points);
  }
  
  refraction(points){
    rotY = this.position.y/2;
    rotY = lerp(rotY, mouseY, 0.1);
	r1 = map(rotY, 0, this.position.y, PI / 3, -PI / 3);
	r1 = constrain(r1, -PI / 3, PI / 3);
	r2 = asin(sin(r1) / r);
    let refrX = width*2;
    let refrY = height*2;
    
    //refraction 1
    push();
    if ((this.position.x+n*2 >= mouseX) && (this.position.x-n*2 <= mouseX) && (this.position.y+n*2 >= mouseY) && (this.position.y-n*2 <= mouseY)){

      strokeWeight(n/5);
      stroke(this.color);
      line(this.position.x, this.position.y, mouseX, mouseY);
      
      translate(this.position.x, this.position.y);
      rotate((PI / 6) + r1);
      strokeWeight(n/7.5);
      stroke(this.color2);

      //change rotation based on mouse pos
      if (this.position.x < mouseX){
          rotate(((PI) + r2));
          }else{
      rotate((TWO_PI) + r2);
          }
      if (this.position.y < mouseY){
          rotate(((PI)/4 + r2));
          }else{
      rotate(-((PI)/4 + r2));
          }

      line(0, 0, refrX, refrY);
      
    //attempting refraction2, not working yet
// let desiredSeparation = n;
//       push();
//       for(let pt of points){
//         let distanceToNeighbor = p5.Vector.dist(this.position, pt.position);
//         if (distanceToNeighbor > 0 && distanceToNeighbor < desiredSeparation){
          
//       let refrRangeX = abs(refrX - this.position.x);
//       let refrRangeY = abs(refrY - this.position.y);
//       let mSlope = refrRangeY/refrRangeX;
//       let refr2X = width*2;
//       let refr2Y = height*2;
      
//       if(pt.position.y+this.size == refrRangeY + mSlope*(pt.position.x+this.size -refrRangeX)){
//         let refrX = pt.position.x;
//         let refrY = pt.position.y;
//         line(0, 0, refrX, refrY);

//         r1 = map(rotY, 0, pt.position.y, PI / 3, -PI / 3);
//         strokeWeight(n/10);
//         stroke(this.color3);
//         line(refrX, refrY, refr2X, refr2Y);
//       } else{     
//         refrX = width*2;
//         refrY = height*2;  
//         r1 = map(rotY, 0, this.position.y, PI / 3, -PI / 3);
//       }
//         }
//       }pop();
      }pop();

    }
}