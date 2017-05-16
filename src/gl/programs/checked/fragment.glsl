precision mediump float;

uniform vec3 color1;
uniform vec3 color2;
varying vec2 colorP;

void main() {
    float x = colorP.x; 
    float y = colorP.y;

    if ((mod(50.0 * x, 1.0) < 0.5) ^^ (mod(50.0 * y, 1.0) < 0.5)) {
      gl_FragColor = vec4(color1, 1);
    } else {
      gl_FragColor = vec4(color2, 1);
    }
}   