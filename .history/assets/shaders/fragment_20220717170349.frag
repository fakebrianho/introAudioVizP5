precision mediump float;

varying vec3 vNormal;


void main(){
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
    float frequency = 20.0;
    float amplitude = 0.1;
    float displacement = sin(frequency * (newPosition.x + u_time)) * amplitude;
    newPosition.x += displacement * vNormal.x;
    color = vec4(vNormal * 0.5 + 0.5, 1.0);
    gl_FragColor = color;
}