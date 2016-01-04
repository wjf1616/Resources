
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

void main() {
	gl_FragColor = v_color * vec4(1, 1, 1, texture2D(u_texture, v_texCoord).a);
}