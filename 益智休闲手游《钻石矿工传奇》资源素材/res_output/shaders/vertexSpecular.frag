varying mediump vec2 v_texCoord;
varying mediump vec4 v_specular;
varying mediump vec4 v_color;

uniform sampler2D u_texture;

void main() {
	gl_FragColor = v_color * texture2D(u_texture, v_texCoord) + v_specular;
}