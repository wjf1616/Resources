
varying lowp vec2 v_texCoord;
varying lowp vec2 v_texCoord1;

uniform sampler2D u_texture;
uniform sampler2D u_texture1;
uniform lowp vec4 u_color4;

void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord);
	gl_FragColor.rgba *= texture2D(u_texture1, v_texCoord1) * u_color4;
}