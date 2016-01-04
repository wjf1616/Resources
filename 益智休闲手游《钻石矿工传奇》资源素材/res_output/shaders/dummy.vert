attribute highp vec4 a_position;
attribute lowp vec4 a_color;
attribute lowp vec2 a_texCoord;
attribute lowp vec4 a_maskbox;

uniform highp mat4 u_modelViewProjectionMatrix;

varying lowp vec4 v_color;
varying lowp vec4 v_maskbox;
varying lowp vec2 v_texCoord;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_color = a_color;
	v_maskbox = a_maskbox;
	v_texCoord = a_texCoord;
}