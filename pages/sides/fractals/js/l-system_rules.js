/* l-system_rules.js

Defines the drawing rule for the various l-system chracters
defined in fractals.js
*/
var drawing_rules = {
  '-': (draw_state, move_func) => {
    draw_state.theta -= draw_state.angle;
  },
  '+': (draw_state, move_func) => {
    draw_state.theta += draw_state.angle;
  },
  '[': (draw_state, move_func) => {
    draw_state.saved_points.push([
      draw_state.x, draw_state.y, draw_state.theta
    ]);
  },
  ']': (draw_state, move_func) => {
    var save = draw_state.saved_points.pop();
    draw_state.x = save[0], draw_state.y = save[1], draw_state.theta = save[2];
    if (draw_state.CTX) { draw_state.CTX.moveTo(save[0], save[1]); }
  },
  'F': (draw_state, move_func) => {
    move_func(draw_state);
  },
  'G': (draw_state, move_func) => {
    move_func(draw_state);
  },
  'A': (draw_state, move_func) => {
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
  },
  'B': (draw_state, move_func) => {
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
  },
  'X': (draw_state, move_func) => {
    move_func(draw_state);
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    move_func(draw_state);
  },
  'x': (draw_state, move_func) => {},
  'Y': (draw_state, move_func) => {
    move_func(draw_state);
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    move_func(draw_state);
  },
  'y': (draw_state, move_func) => {},
  'V': (draw_state, move_func) => {
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
  },
  'v': (draw_state, move_func) => {
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta -= draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
    draw_state.theta += draw_state.angle;
    move_func(draw_state);
  },
}
