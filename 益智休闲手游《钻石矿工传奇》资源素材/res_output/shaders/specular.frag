varying lowp vec2 v_texCoord;
varying mediump float specularValue;

uniform sampler2D u_texture;

void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord);	
	mediump vec3 specular = vec3(specularValue, specularValue, specularValue);
	gl_FragColor.rgb = gl_FragColor.rgb + specular;
}