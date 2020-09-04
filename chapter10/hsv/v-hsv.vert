// License MIT.
// Created by Jaye Lee <lidongjies@gmail.com>


precision mediump float;

#define TWO_PI 6.28318530718

vec3 rgb2hsv(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    vec2 toCenter = vec2(0.5) - st;
    float radius = length(toCenter) * 2.;
    float angle = atan(toCenter.y, toCenter.x);
    vec3 color = hsv2rgb(vec3((angle / TWO_PI) + 0.5, 1.0, radius));
    color = color * smoothstep(radius, radius + 0.01, 1.0);
    gl_FragColor = vec4(color, 1.0);
}