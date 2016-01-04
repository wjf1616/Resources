
attribute highp vec4 a_position;
attribute mediump vec3 a_normal;
attribute mediump vec2 a_texCoord;
uniform highp mat4 u_modelViewMatrix;
uniform highp mat4 u_modelViewProjectionMatrix;

varying mediump vec3 v_normal;
varying mediump vec2 v_texCoord;
varying mediump vec4 v_position;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord = a_texCoord;
	v_position = a_position;
	
	mediump mat3 normalTransform = mat3(u_modelViewMatrix[0].xyz,
								u_modelViewMatrix[1].xyz,
								u_modelViewMatrix[2].xyz);
	
	v_normal = normalize(normalTransform * a_normal);
}