precision mediump float;

varying vec3 vNormal;
varying float vNoise;

void main(){
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);

    color = vec4(vNormal * vNoise + 0.5, 1.0);
    gl_FragColor = color;
}