
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

void main() {
	lowp vec4 textureColor = texture2D(u_texture, v_texCoord);
	if(textureColor.a > 0.5) discard;
	else gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
	
}