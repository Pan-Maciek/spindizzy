precision lowp float;

attribute vec3 vert;

uniform vec3 position;
uniform mat4 projection;

void main() {
    gl_Position = projection * vec4(vert + position, 1);
}