
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;


void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord);
	gl_FragColor.r = (gl_FragColor.r < 0.5) ? (2.0 * gl_FragColor.r * v_color.r) : (1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - v_color.r));
	gl_FragColor.g = (gl_FragColor.g < 0.5) ? (2.0 * gl_FragColor.g * v_color.g) : (1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - v_color.g));
	gl_FragColor.b = (gl_FragColor.b < 0.5) ? (2.0 * gl_FragColor.b * v_color.b) : (1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - v_color.b));
	gl_FragColor.a *= v_color.a;
}