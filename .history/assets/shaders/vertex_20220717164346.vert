precision mediump float;
attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main(){
    vec4 newPosition = vec4(aPosition, 1.0);
    newPosition.xy = newPosition.xy * 2.0 - 1.0;
    gl_Position = vec4(newPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * newPosition;
}