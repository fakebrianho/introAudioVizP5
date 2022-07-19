precision mediump float;
attribute vec2 aPosition;
void main(){
    vec3 newPosition = aPosition;
    newPosition.xy = newPosition * 2.0 - 1.0;
    gl_FragPosition = vec4(newPosition, 1.0);

}