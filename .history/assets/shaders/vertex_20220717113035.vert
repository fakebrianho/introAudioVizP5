precision mediump float;
attribute vec2 a_position;
void main(){
    vec3 newPosition = aposition;
    newPosition.xy = newPosition * 2.0 - 1.0;
    gl_FragPosition = vec4(newPosition, 1.0);

}