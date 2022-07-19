precision mediump float;

varying vec3 vNormal;
varying float vNoise;

void main(){
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 0.7, 0.4);	
    vec3 d = vec3(0.00, 0.15, 0.20);	 
    
    color = vec4(vNormal * vNoise + 0.5, 1.0);
    gl_FragColor = color;
}