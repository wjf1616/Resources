
attribute highp vec4 a_position;
attribute mediump vec3 a_normal;
attribute mediump vec2 a_texCoord;
uniform highp mat4 u_modelViewMatrix;
uniform highp mat4 u_modelViewProjectionMatrix;

varying mediump vec2 v_texCoord;
varying mediump vec2 v_texCoord1;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord = a_texCoord;
	
	mediump mat3 normalTransform = mat3(u_modelViewMatrix[0].xyz,
								u_modelViewMatrix[1].xyz,
								u_modelViewMatrix[2].xyz);
								
	mediump float t = length(normalize(normalTransform * a_normal).xy + vec2(-0.2, 0.4)) * 0.7;
	v_texCoord1	= vec2(1.0 - t, 0.0);
}