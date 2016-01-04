
attribute highp vec4 a_position;

uniform highp mat4 u_modelViewProjectionMatrix;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
}