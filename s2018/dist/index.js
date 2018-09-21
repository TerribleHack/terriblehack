/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsZUFBZTs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLHFCQUFxQixlQUFlOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxvQkFBb0I7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsV0FBVztBQUM1QjtBQUNBOztBQUVBO0FBQ0EsdUM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBkb3Qod2lkdGgsIGhlaWdodCwgc3BlZWQpIHtcbiAgLy9QaWNrcyBhIHJhbmRvbSBzdGFydGluZyBjb29yZGluYXRlIGFuZCBzcGVlZCB3aXRoaW4gdGhlIGJvdW5kcyBnaXZlblxuICB0aGlzLnggPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqd2lkdGgpO1xuICB0aGlzLnkgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqaGVpZ2h0KTtcbiAgdGhpcy5zcGVlZFggPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqc3BlZWQtc3BlZWQvMik7XG4gIHRoaXMuc3BlZWRZID0gTWF0aC5yYW5kb20oTWF0aC5yYW5kb20oKSpzcGVlZC1zcGVlZC8yKTtcbn1cblxuZnVuY3Rpb24gZG90R3JhcGgoKSB7XG4gIHZhciBtYXhEaXN0YW5jZSA9IDQwMDtcbiAgdmFyIG51bURvdHMgPSAyMDtcbiAgXG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YWdlXCIpO1xuICB2YXIgY29udGFpbmVyID0gY2FudmFzLnBhcmVudEVsZW1lbnQ7XG4gIHZhciBzdGFnZTtcbiAgdmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIHZhciBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIHZhciBkb3RzID0gW107XG4gIHZhciB0aW1lcjtcbiAgXG4gIHZhciB0aWNrID0gZnVuY3Rpb24gKCkge1xuICAgIFxuICAgIC8vUGFpbnRzIG92ZXIgb2xkIGZyYW1lXG4gICAgc3RhZ2UuZmlsbFN0eWxlID0gXCIjNTU1NUFBXCI7XG4gICAgc3RhZ2UucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICBzdGFnZS5maWxsKCk7XG4gICAgXG4gICAgc3RhZ2UuZmlsbFN0eWxlID0gXCJyZ2JhKDE5MywgMTYyLCAyMjIsIDEpXCI7XG4gICAgdmFyIGk9MDtcbiAgICBmb3IgKGk9MDsgaTxkb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBcbiAgICAgIC8vTW92ZSBkb3RcbiAgICAgIGRvdHNbaV0ueCs9ZG90c1tpXS5zcGVlZFg7XG4gICAgICBkb3RzW2ldLnkrPWRvdHNbaV0uc3BlZWRZO1xuICAgICAgXG4gICAgICAvL0JvdW5jZSBkb3Qgb2ZmIHdhbGxzXG4gICAgICBpZiAoZG90c1tpXS54PDApIHtcbiAgICAgICAgZG90c1tpXS54PTA7XG4gICAgICAgIGRvdHNbaV0uc3BlZWRYICo9IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGRvdHNbaV0ueD53aWR0aCkge1xuICAgICAgICBkb3RzW2ldLng9d2lkdGg7XG4gICAgICAgIGRvdHNbaV0uc3BlZWRYICo9IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGRvdHNbaV0ueTwwKSB7XG4gICAgICAgIGRvdHNbaV0ueT0wO1xuICAgICAgICBkb3RzW2ldLnNwZWVkWSAqPSAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChkb3RzW2ldLnk+aGVpZ2h0KSB7XG4gICAgICAgIGRvdHNbaV0ueT1oZWlnaHQ7XG4gICAgICAgIGRvdHNbaV0uc3BlZWRZICo9IC0xO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvL0RyYXcgZG90XG4gICAgICBzdGFnZS5iZWdpblBhdGgoKTtcbiAgICAgIHN0YWdlLmFyYyhkb3RzW2ldLngsZG90c1tpXS55LDMsMCwyKk1hdGguUEkpO1xuICAgICAgc3RhZ2UuZmlsbCgpO1xuICAgIH1cbiAgICBcbiAgICAvL0NhbGN1bGF0ZSBkaXN0YW5jZXMgYmV0d2VlbiBldmVyeSBkb3RcbiAgICB2YXIgZGlzdGFuY2VzID0gW107XG4gICAgZm9yIChpPTA7IGk8ZG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yICh2YXIgaj1pKzE7IGo8ZG90cy5sZW5ndGg7IGorKykge1xuICAgICAgICBcbiAgICAgICAgLy9BZGQgdGhlIGxpbmUgdG8gdGhlIGRyYXcgbGlzdCBpZiBpdCdzIHNob3J0ZXIgdGhhbiB0aGUgc3BlY2lmaWVkIG1heCBkaXN0YW5jZVxuICAgICAgICB2YXIgZGlzdCA9IE1hdGguc3FydChNYXRoLnBvdyhkb3RzW2ldLngtZG90c1tqXS54LCAyKSArIE1hdGgucG93KGRvdHNbaV0ueS1kb3RzW2pdLnksIDIpKTtcbiAgICAgICAgaWYgKGRpc3QgPD0gbWF4RGlzdGFuY2UpIGRpc3RhbmNlcy5wdXNoKFtpLCBqLCBkaXN0XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9EcmF3IHRoZSBsaW5lc1xuICAgIGZvciAoaT0wOyBpPGRpc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgXG4gICAgICAvL1RoZSBmYXJ0aGVyIHRoZSBkaXN0YW5jZSBvZiB0aGUgbGluZSwgdGhlIGxlc3Mgb3BhcXVlIGl0IHdpbGwgYmUgZHJhd25cbiAgICAgIHN0YWdlLnN0cm9rZVN0eWxlID0gXCJyZ2JhKDE5MywgMTYyLCAyMjIsIFwiICsgKG1heERpc3RhbmNlLWRpc3RhbmNlc1tpXVsyXSkvbWF4RGlzdGFuY2UgKyBcIilcIjtcbiAgICAgIHN0YWdlLmJlZ2luUGF0aCgpO1xuICAgICAgc3RhZ2UubW92ZVRvKGRvdHNbZGlzdGFuY2VzW2ldWzBdXS54LCBkb3RzW2Rpc3RhbmNlc1tpXVswXV0ueSk7XG4gICAgICBzdGFnZS5saW5lVG8oZG90c1tkaXN0YW5jZXNbaV1bMV1dLngsIGRvdHNbZGlzdGFuY2VzW2ldWzFdXS55KTtcbiAgICAgIHN0YWdlLnN0cm9rZSgpO1xuICAgIH1cblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7IFxuICB9O1xuICBcbiAgdmFyIHJlc2l6ZUNhbnZhcyA9IGZ1bmN0aW9uKCkge1xuICAgIHdpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG4gICAgY2FudmFzLndpZHRoPXdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQ9aGVpZ2h0O1xuICAgIGNvbnNvbGUubG9nKHdpZHRoICsgXCIsIFwiICsgaGVpZ2h0KTtcbiAgfTtcbiAgXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXNpemVDYW52YXMoKTtcbiAgfSk7XG4gIFxuICAvL01heGltaXplIGFuZCBzZXQgdXAgY2FudmFzXG4gIHJlc2l6ZUNhbnZhcygpO1xuICBpZiAoY2FudmFzLmdldENvbnRleHQpIHtcbiAgICBzdGFnZSA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgXG4gICAgLy9DcmVhdGUgZG90c1xuICAgIGZvciAodmFyIGk9MDsgaTxudW1Eb3RzOyBpKyspIHtcbiAgICAgIGRvdHMucHVzaChuZXcgZG90KHdpZHRoLCBoZWlnaHQsIDMpKTtcbiAgICB9XG4gICAgXG4gICAgLy9TZXQgdXAgdGltZWQgZnVuY3Rpb25cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOyBcbiAgfSBlbHNlIHtcbiAgICBhbGVydChcIkNhbnZhcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgfVxufVxuXG52YXIgZ3JhcGggPSBuZXcgZG90R3JhcGgoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=