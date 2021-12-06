'use strict';

// Canvas class
class Canvas {
  /* args:
      id of canvas - string */
  constructor(id) {
    this.c = document.getElementById(id);
    this.ctx = this.c.getContext('2d', { alpha: true });
    this.width = this.c.width;
    this.height = this.c.height;
    this.playing = false;
  }

  // clear canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // draw point at x, y with size (radius ) len on CTX
  drawPoint(x, y, len, style = "#000000") {
    this.ctx.beginPath();
    this.ctx.strokeStyle = style;
    this.ctx.arc(x, y, len, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // draw line from x1, y1 to x2, y2
  drawLine(x1, y1, x2, y2, style = "#000000", width = 1) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = style;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // draw arc centered at x, y with radius r
  // starting at startTheta ending at endTheta
  drawArc(x, y, r, startTheta = 0, endTheta = 2 * Math.PI, style = "#000000", width = 1) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, startTheta, endTheta);
    this.ctx.strokeStyle = style;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  // draw ellpise centered at x, y with x radius radiusX and y radius radiusY
  // the ellipse is rotated by rotation radians and starts at startAngle and
  // ends at endAngle
  drawEllipse(x, y, radiusX, radiusY, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI,
    anticlockwise = false, style = "#000000", width = 1) {
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle,
      anticlockwise);
    this.ctx.strokeStyle = style;
    this.ctx.lineWidth = width;
    this.ctx.stroke();
  }

  // draw polygon with points in points,
  drawPoly(points, fillStyle = null, style = "#000000", width = 1) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = style;
    this.ctx.lineWidth = width;

    if (fillStyle) { this.ctx.fillStyle = fillStyle; this.ctx.fill(); }
    this.ctx.stroke();
  }

  // draw text text at x, y (defines botton left of text) with font and style
  text(text, x, y, font = "11px Arial", style = "#000000") {
    this.ctx.font = font;
    this.ctx.fillStyle = style;
    this.ctx.fillText(text, x, y);
  }

  // draw img img at x, y (defines botton left of text)
  image(img, x, y, width = undefined, height = undefined) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  // define animation which plays animation with waittime
  // TODO: allow for multiple animations to play on a canvas
  animate(animation, waittime = 0) {
    this.anime = animation, this.waittime = waittime;
    this.animation = new Animation(animation, this, waittime = 0);
  }

  // play animation if it is defined
  play() {
    if (this.anime) {
      this.animation = new Animation(this.anime, this, this.waittime);
    }
  }

  // pause animation
  pause() { this.animation.pause(); }
  // pause and clear animation
  stop() { if (this.animation) { this.animation.stop(); } this.clear(); }
}

// Animation Class
// defines some animation to be played on canvas. Modularization allows
// more control over stop and pause
class Animation {
  constructor(animation, canvas, waittime = 0) {
    this.animation = animation, this.canvas = canvas;
    this.playing = true, this.waittime = waittime;
    this.animate();
  }

  // animate animation
  animate() {
    if (this.playing) {
      this.canvas.clear();
      this.animation();
      setTimeout(() => {
        window.requestAnimationFrame(() => { this.animate(); });
      }, this.waittime);
    }
  }
  // pause animation and clear canvas
  stop() { this.playing = false; this.canvas.clear(); }
  // pause animation with canvas still showing animation
  pause() { this.playing = false; }
}

// Sidebar class
// used to interact with a sidebar, sidebar will contain variables and buttons
class Sidebar {
  constructor(id) {
    this.sidebar = document.getElementById(id);
    this.elements = {};
  }

  addVariables(id, type, text, func, value) {
    let ref = document.createElement(type);
    ref.setAttribute("onclick", func);
    ref.setAttribute("id", "id");
    ref.setAttribute("value", value);
    ref.appendChild(document.createTextNode(text));
  }
}
