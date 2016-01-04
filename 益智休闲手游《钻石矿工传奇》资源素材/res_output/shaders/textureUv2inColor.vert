attribute highp vec4 a_position;
attribute lowp vec4 a_color;
attribute lowp vec2 a_texCoord;
attribute lowp vec2 a_texCoord2;

uniform highp mat4 u_modelViewProjectionMatrix;

varying lowp vec2 v_texCoord;
varying lowp vec2 v_texCoord2;
varying lowp vec4 v_color;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord = a_texCoord;
	v_texCoord2 = a_texCoord2;
	v_color = a_color;
}