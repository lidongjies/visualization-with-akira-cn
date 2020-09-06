precision highp float;

varying vec2 v_uv;
uniform sampler2D u_texture;
uniform float u_colorMartix[20];

vec4 transformColor(inout vec4 color, float matrix[20]) {
	color.r = matrix[0] * color.r + matrix[1] * color.g + matrix[2] * color.b + matrix[3] * color.a + matrix[4];
	color.g = matrix[5] * color.r + matrix[6] * color.g + matrix[7] * color.b + matrix[8] * color.a + matrix[9];
	color.b = matrix[10] * color.r + matrix[11] * color.g + matrix[12] * color.b + matrix[13] * color.a + matrix[14];
	color.a = matrix[15] * color.r + matrix[16] * color.g + matrix[17] * color.b + matrix[18] * color.a + matrix[19];
    return color;
}

void main() {
    vec4 color = texture2D(u_texture, v_uv);
    gl_FragColor = transformColor(color, u_colorMartix);
}