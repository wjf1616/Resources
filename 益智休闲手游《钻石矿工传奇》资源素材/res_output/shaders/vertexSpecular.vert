
attribute highp vec4 a_position;
attribute mediump vec3 a_normal;
attribute mediump vec2 a_texCoord;
attribute mediump vec4 a_color;
attribute mediump float a_shininess;

uniform highp mat4 u_modelViewMatrix;
uniform highp mat4 u_modelViewProjectionMatrix;


varying mediump vec2 v_texCoord;
varying mediump vec4 v_specular;
varying mediump vec4 v_color;

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord = a_texCoord;
	v_color = a_color;
	
	mediump mat3 normalTransform = mat3(u_modelViewMatrix[0].xyz,
								u_modelViewMatrix[1].xyz,
								u_modelViewMatrix[2].xyz);
	
	mediump vec3 v_normal = normalize(normalTransform * a_normal);
	
	mediump vec3 fixedLight = vec3(0.161, -0.32, 0.94); //vector from object to light
	
	mediump vec3 normal = v_normal;
	
	mediump float specularValue = pow(clamp(dot(normal, fixedLight), 0.0, 1.0), 4.0*a_shininess);
	v_specular = vec4(specularValue, specularValue, specularValue, 0.0);
}