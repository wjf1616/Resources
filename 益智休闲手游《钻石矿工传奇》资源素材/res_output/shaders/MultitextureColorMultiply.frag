uniform sampler2D u_texture;
uniform sampler2D u_texture1;

varying lowp vec2 v_texCoord;
varying lowp vec2 v_texCoord2;
varying lowp vec4 v_color;

void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord);
	
	// Sample mask-texture
	gl_FragColor.a = texture2D(u_texture1, v_texCoord2).a;
	gl_FragColor = gl_FragColor * v_color;
}