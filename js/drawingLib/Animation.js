// Animation Class
// defines some animation to be played on canvas. Modularization allows
// more control over stop and pause
export default class Animation {
  constructor(canvas, update, waittime=10, clearCanvas=true) {
    this.canvas = canvas;
    this.update = update;
    this.waittime = waittime;
    this.clearCanvas = clearCanvas;
    this.animation = this.animate();
    this.timestep = 0;
    this.paused = false;
  }

  animationStep(canvas, update, clearCanvas, timestep) {
    if (clearCanvas) {
      canvas.clear();
    }
    update(timestep[0]);
    timestep[0]++;
  }

  // animate animation
  animate() {
    return setInterval(this.animationStep, 
      this.waittime, this.canvas, this.update, this.clearCanvas, 
      [this.timestep]);
  }

  // pause animation and clear canvas
  stop() {
    clearInterval(this.animation);
    this.canvas.clear();
  }

  // play/pause animation with canvas still showing animation
  togglePlay() {
    if (this.paused) {
      this.animation = this.animate();
    } else {
      clearInterval(this.animation);
    }
    this.paused = !this.paused;
  }
}
