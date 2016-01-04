
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

void main() {
	vec4 texel = texture2D(u_texture, v_texCoord);
    // texel *= vec4(texel.a, texel.a, texel.a, 1.0); /* Premultiply alpha */
    gl_FragColor = v_color * texel;
}