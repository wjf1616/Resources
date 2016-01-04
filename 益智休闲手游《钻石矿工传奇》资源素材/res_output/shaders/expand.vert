
attribute mediump vec4 a_position;
attribute lowp vec3 a_normal;

uniform mediump mat4 u_modelViewProjectionMatrix;
uniform mediump mat4 u_modelViewMatrix;
uniform mediump mat4 u_projectionMatrix;

void main() {
	/*gl_Position = u_modelViewProjectionMatrix * (a_position + vec4(normalize(a_normal), 0.0) * 1.0);*/
	
	gl_Position = u_modelViewMatrix * a_position + normalize(u_modelViewMatrix * vec4(a_normal, 0.0)) * 2.0;
	gl_Position = u_projectionMatrix * gl_Position;
}