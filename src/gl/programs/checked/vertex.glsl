uniform vec3 position;
attribute vec3 vert;
varying vec2 colorP;
uniform mat4 projection;
void main() {
    gl_Position = projection * vec4(position + vert, 1);
    colorP.x = gl_Position.y;
    colorP.y = gl_Position.x;
    gl_PointSize = 10.0;
}