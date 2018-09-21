function dot(width, height, speed) {
  //Picks a random starting coordinate and speed within the bounds given
  this.x = Math.round(Math.random()*width);
  this.y = Math.round(Math.random()*height);
  this.speedX = Math.round(Math.random()*speed-speed/2);
  this.speedY = Math.random(Math.random()*speed-speed/2);
}

function dotGraph() {
  var maxDistance = 400;
  var numDots = 20;
  
  var canvas = document.getElementById("stage");
  var container = canvas.parentElement;
  var stage;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var dots = [];
  var timer;
  
  var tick = function () {
    
    //Paints over old frame
    stage.fillStyle = "#5555AA";
    stage.rect(0, 0, width, height);
    stage.fill();
    
    stage.fillStyle = "rgba(193, 162, 222, 1)";
    var i=0;
    for (i=0; i<dots.length; i++) {
      
      //Move dot
      dots[i].x+=dots[i].speedX;
      dots[i].y+=dots[i].speedY;
      
      //Bounce dot off walls
      if (dots[i].x<0) {
        dots[i].x=0;
        dots[i].speedX *= -1;
      }
      if (dots[i].x>width) {
        dots[i].x=width;
        dots[i].speedX *= -1;
      }
      if (dots[i].y<0) {
        dots[i].y=0;
        dots[i].speedY *= -1;
      }
      if (dots[i].y>height) {
        dots[i].y=height;
        dots[i].speedY *= -1;
      }
      
      //Draw dot
      stage.beginPath();
      stage.arc(dots[i].x,dots[i].y,3,0,2*Math.PI);
      stage.fill();
    }
    
    //Calculate distances between every dot
    var distances = [];
    for (i=0; i<dots.length; i++) {
      for (var j=i+1; j<dots.length; j++) {
        
        //Add the line to the draw list if it's shorter than the specified max distance
        var dist = Math.sqrt(Math.pow(dots[i].x-dots[j].x, 2) + Math.pow(dots[i].y-dots[j].y, 2));
        if (dist <= maxDistance) distances.push([i, j, dist]);
      }
    }

    //Draw the lines
    for (i=0; i<distances.length; i++) {
      
      //The farther the distance of the line, the less opaque it will be drawn
      stage.strokeStyle = "rgba(193, 162, 222, " + (maxDistance-distances[i][2])/maxDistance + ")";
      stage.beginPath();
      stage.moveTo(dots[distances[i][0]].x, dots[distances[i][0]].y);
      stage.lineTo(dots[distances[i][1]].x, dots[distances[i][1]].y);
      stage.stroke();
    }

    window.requestAnimationFrame(tick); 
  };
  
  var resizeCanvas = function() {
    width = container.offsetWidth;
    height = container.offsetHeight;
    canvas.width=width;
    canvas.height=height;
    console.log(width + ", " + height);
  };
  
  window.addEventListener("resize", function () {
    resizeCanvas();
  });
  
  //Maximize and set up canvas
  resizeCanvas();
  if (canvas.getContext) {
    stage = canvas.getContext("2d");
    
    //Create dots
    for (var i=0; i<numDots; i++) {
      dots.push(new dot(width, height, 3));
    }
    
    //Set up timed function
    window.requestAnimationFrame(tick); 
  } else {
    alert("Canvas not supported.");
  }
}

var graph = new dotGraph();
