precision mediump float;

varying vec3 vNormal;
varying float vNoise;
uniform float u_time;
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}
void main(){
    vec4 color = vec4(1.0, 1.0, 0.0, 1.0);
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 0.7, 0.4);	
    vec3 d = vec3(0.00, 0.15, 0.20);	 
    vec3 cc = palette(vNoise *  vNormal.y, a, b, c, d);
    color = vec4(cc * vNoise,1.0);
    gl_FragColor = color;
}