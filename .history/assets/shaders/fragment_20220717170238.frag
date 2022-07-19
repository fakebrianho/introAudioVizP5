precision mediump float;

varying vec3 vNormal;


void main(){
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
    float frequency = 0.1;
    color = vec4(vNormal * 0.5 + 0.5, 1.0);
    gl_FragColor = color;
}