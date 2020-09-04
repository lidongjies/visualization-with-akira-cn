attribute vec2 a_vertexPosition;
attribute vec2 a_uv;

varying vec2 v_uv;

void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(a_vertexPosition.xy, 0.0, 1.0);
    v_uv = a_uv;
}