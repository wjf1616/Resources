attribute vec4 a_position;
attribute vec4 a_color;
attribute vec2 a_texCoord;
uniform mat4 u_modelViewProjectionMatrix;

uniform vec4 u_materialAmbient;

varying vec4 v_color;
varying vec2 v_texCoord;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_color = a_color * vec4(u_materialAmbient.a, u_materialAmbient.a, u_materialAmbient.a, 1.0);
	v_texCoord = a_texCoord;
}