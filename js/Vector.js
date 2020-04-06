// Vector Object
class Vector {
  constructor(dim, init=null) {
    for (let i = 0; i < dim; i++) this[i] = 0;
    // this.vec = Array(dim).fill(0)
    if (init) { for (let i = 0; i < init.length; i++) this[i] = init[i]; }
    this.dim = dim;
  }
  add(otherVec) {
    for (let i = 0; i < this.dim; i++) { this[i] += otherVec[i]; }
  }
  sub(otherVec) {
    for (let i = 0; i < this.dim; i++) { this[i] -= otherVec[i] }
  }
  mult(constant) {
    for (let i = 0; i < this.dim; i++) { this[i] *= constant }
  }
  div(constant) {
    for (let i = 0; i < this.dim; i++) { this[i] /= constant }
  }
  // get magnitude of vector
  mag() {
    let mag = 0;
    for (let i = 0; i < this.dim; i++) { mag += Math.pow(this[i], 2)}
    return Math.sqrt(mag);
  }
  magAbs() {
    let mag = 0;
    for (let i = 0; i < this.dim; i++) { mag += Math.abs(this[i])}
    if (Number.isNaN(mag)) {return 0}
    return mag;
  }
  setMag(newMag) {
    let mag = this.mag();
    for (let i = 0; i < this.dim; i++) { this[i] *= (newMag / mag)}
  }
  // limit the magnitude of vector
  limit(lim) {
    let mag = this.mag();
    if (mag > lim) { this.setMag(lim); }
  }
  set(newVec) {
    for (let i = 0; i < this.dim; i++) { this[i] = newVec[i] }
  }
  dist(otherVec) {
    let dist = 0;
    for (let i = 0; i < this.dim; i++) { dist += Math.pow(otherVec[i] - this[i], 2)}
    if (isNaN(dist)) {return 0}
    // console.log(Math.sqrt(dist));
    return Math.sqrt(dist);
  }
  distAbs(otherVec) {
    let dist = 0;
    for (let i = 0; i < this.dim; i++) { dist += Math.abs(otherVec[i] - this[i]); }
    if (Number.isNaN(dist)) {return 0}
    // console.log(Math.sqrt(dist));
    return dist;
  }
  check(){
    for (let i = 0; i < this.dim; i++) { if (Number.isNaN(this[i])) {this[i] = 0} }
  }
}
