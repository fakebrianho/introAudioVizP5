precision mediump float;
attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float u_time;
varying vec3 vNormal;


void main(){
    vec4 newPosition = vec4(aPosition, 1.0);
    // newPosition.xy = newPosition.xy * 2.0 - 1.0;
    // gl_Position = vec4(newPosition, 1.0);
    float frequency = 20.0;
    float amplitude = 0.1;
    float displacement = sin(newPosition);
    newPosition.x += displacement * aNormal.x * amplitude;
    vNormal = aNormal;
    gl_Position = uProjectionMatrix * uModelViewMatrix * newPosition;
}