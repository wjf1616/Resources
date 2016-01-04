
attribute highp vec4 a_position;
attribute mediump vec3 a_normal;
attribute mediump vec2 a_texCoord;
uniform highp mat4 u_modelViewMatrix;
uniform highp mat4 u_modelViewProjectionMatrix;
uniform mediump float u_materialShininess;

varying mediump vec2 v_texCoord;
varying mediump float specularValue;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord = a_texCoord;
	mediump vec4 v_position = a_position;
	
	mediump mat3 normalTransform = mat3(u_modelViewMatrix[0].xyz,
								u_modelViewMatrix[1].xyz,
								u_modelViewMatrix[2].xyz);
	
	mediump vec3 v_normal = normalize(normalTransform * a_normal);
	
	mediump vec3 fixedLight = vec3(0.161, -0.32, 0.94); //vector from objecto to light
	
	mediump vec3 normal = v_normal;
	
	specularValue = pow(clamp(dot(normal, fixedLight), 0.0, 1.0), 4.0*u_materialShininess);
}