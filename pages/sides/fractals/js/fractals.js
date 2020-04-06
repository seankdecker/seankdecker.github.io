/* fractals.js

This file defines various fractals that I have found
Fractals are filed as a mapping with the following components.
Keep in mind that fractals are simply strings where characters
represent some action and increases in the dimension of the fractal
are represented only as replacements of the chracters in the string
using the rules of the fractal. Also, fractals are draw by a series
of rotations and draw line forwards. All lines have the same len.

  name    : the name
  len  : given a canvas with given canvas.width and canvas.height,
            how long are the lines of the fractal be for the given dimension
  axiom   : starting string for the fractal, fractal of dim 0
  angle   : angle at which cursor starts facing
  x_pos   : x position of where the cursor starts
  y_pos   : y position of where cursor starts
  theta   : for each rotation, how much the angle changes

What the drawing rules are for characters is given in l-system_rules
*/

var fractals = {
  'Hilbert': {
    name: 'Hilbert Curve',
    // lines per side = 2^(x+1) - 1
    len: function(string, draw_state) { return canvas.width / (Math.pow(2,DIM+1) - 1); },
    axiom: 'A',
    rules: {
      A: '+BF-AFA-FB+',
      B: '-AF+BFB+FA-'
    },
    angle: Math.PI / 2,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Koch Snow': {
    name: 'Koch Snowflake',
    len: function(string, draw_state) { return canvas.width * Math.sqrt(3 / 4) / Math.pow(3, DIM); },
    axiom: 'F++F++F',
    rules: {
      F: 'F-F++F-F'
    },
    angle: Math.PI / 3,
    x_pos: canvas.width * (Math.sqrt(1 / 3) - 1 / 2),
    y_pos: 3 * canvas.height / 4,
    theta: function() { return 0; }
  },
  'Peano': {
    name: 'Peano Curve',
    len: function(string, draw_state) {
      var denominator = 0;
      for (let i = 0; i <= DIM; i++) { denominator += 2 * Math.pow(3, i) }
      return canvas.width / denominator;},
    axiom: 'X',
    rules: {
      X: 'XFYFX+F+YFXFY-F-XFYFX',
      Y: 'YFXFY-F-XFYFX+F+YFXFY'
    },
    angle: Math.PI / 2,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Dragon': {
    name: 'Dragon Curve',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'Fx',
    rules: {
      x: 'x+yF+',
      y: '-Fx-y'
    },
    angle: Math.PI / 2,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Koch Curve': {
    name: 'Koch Curve',
    len: function(string, draw_state) { return canvas.width / Math.pow(3, DIM); },
    axiom: 'F',
    rules: {
      F: 'F+F-F-F+F'
    },
    angle: Math.PI / 2,
    x_pos: 0,
    y_pos: 3 * canvas.height / 4,
    theta: function() { return 0; }
  },
  'Sierpinski': {
    name: 'Sierpinski Triangle',
    len: function(string, draw_state) { return canvas.width / Math.pow(2, DIM); },
    axiom: 'F+G+G',
    rules: {
      F: 'F+G-F-G+F',
      G: 'GG'
    },
    angle: 2 * Math.PI / 3,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Fern': {
    name: 'Fern',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: '++x',
    rules: {
      x: 'F+[[x]-x]-F[-Fx]+x',
      F: 'FF'
    },
    angle: 5 * Math.PI / 36,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Sierpinski Arrowhead': {
    name: 'Sierpinski Arrowhead',
    len: function(string, draw_state) { return canvas.width / Math.pow(2, DIM); },
    axiom: 'F',
    rules: {
      F: 'G-F-G',
      G: 'F+G+F',
    },
    angle: Math.PI / 3,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return Math.PI / 3 * (DIM % 2); }
  },
  'Binary Tree': {
    name: 'Binary Tree',
    len: function(string, draw_state) { return canvas.width / Math.pow(2, DIM); },
    axiom: 'F',
    rules: {
      F: 'G[+F]-F',
      G: 'GG'
    },
    angle: Math.PI / 3,
    x_pos: canvas.width / 2,
    y_pos: canvas.height,
    theta: function() { return Math.PI / 2; }
  },
  'Trinary Tree': {
    name: 'Trinary Tree',
    len: function(string, draw_state) { return canvas.width / Math.pow(2, DIM); },
    axiom: 'F',
    rules: {
      F: 'G[+F][-F]F',
      G: 'GG'
    },
    angle: Math.PI / 6,
    x_pos: canvas.width / 2,
    y_pos: canvas.height,
    theta: function() { return Math.PI / 2; }
  },
  'Square Snow': {
    name: 'Square Snowflake',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F+F+F+F',
    rules: {
      F: 'G-F+F+F-G',
      G: 'GG'
    },
    angle: Math.PI / 2,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Flow Snake': {
    name: 'Flow Snake',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F',
    rules: {
      F: 'F-G--G+F++FF+G-',
      G: '+F-GG--G-F++F+G'
    },
    angle: Math.PI / 3,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Coral': {
    name: 'Coral Reef',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F',
    rules: {
      F: 'FF+[+F-F-F]-[-F+F+F]'
    },
    angle: Math.PI / 8,
    x_pos: 0,
    y_pos: canvas.height / 2,
    theta: function() { return 5 * Math.PI / 8; }
  },
  'Pine': {
    name: 'Pine Tree',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'y',
    rules: {
      x: 'x[-FFF][+FFF]Fx',
      y: 'yFx[+y][-y]'
    },
    angle: 257 * Math.PI / 1800,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return Math.PI / 4; }
  },
  'Fan': {
    name: 'Fan',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F',
    rules: {
      F: 'F[+FF][-FF]F[-F][+F]F'
    },
    angle: 7 * Math.PI / 36,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return Math.PI / 4; }
  },
  'Rad Tri': {
    name: 'Radical Triangle',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F+F+F',
    rules: {
      F: 'F-F+F'
    },
    angle: 2 * Math.PI / 3,
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Weed': {
    name: 'A Weed',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F',
    rules: {
      F: 'FF-[xy]+[xy]',
      x: '+Fy',
      y: '-Fx'
    },
    angle: Math.PI / 8,
    x_pos: 0,
    y_pos: 0,
    theta: function() { return 50 * Math.PI / 121; }
  },
  'Hairball': {
    name: 'Hairball',
    len: function(string, draw_state) { return autoSetDrawingVars(string, draw_state);},
    axiom: 'F+F+F',
    angle: Math.PI / 8,
    rules: {
      F: 'FF+F++F+F'
    },
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  },
  'Crystal': {
    name: 'Crystal',
    len: function(string, draw_state) { return canvas.width / Math.pow(3, DIM); },
    axiom: 'F+F+F',
    angle: Math.PI / 2,
    rules: {
      F: 'FF+F++F+F'
    },
    x_pos: 0,
    y_pos: canvas.height,
    theta: function() { return 0; }
  }
}
