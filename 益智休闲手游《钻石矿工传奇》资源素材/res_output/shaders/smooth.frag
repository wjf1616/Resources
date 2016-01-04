
varying mediump vec3 v_normal;
varying lowp vec2 v_texCoord;
varying mediump vec4 v_position;

uniform sampler2D u_texture;
uniform lowp vec4 u_materialAmbient;
uniform lowp vec4 u_materialDiffuse;
uniform lowp vec4 u_materialSpecular;
uniform mediump float u_materialShininess;
uniform lowp vec4 u_color4;

void main() {
	gl_FragColor = texture2D(u_texture, v_texCoord);	
	
    /*
	vec3 V = vec3(0.0, 0.0, 1.0); // infinite point of view
	vec3 fixedLight = vec3(0.298, -0.59, 0.74); //vector from objecto to light
	//vec3 normal = normalize(v_normal);
    vec3 normal = vec3(0.0, 0.0, 1.0);
	float nDotLFixedLight = clamp(dot(normalize(fixedLight), normal), 0.0, 1.0);
	
	vec3 diffuse = vec3(nDotLFixedLight, nDotLFixedLight, nDotLFixedLight);
	float specularValue = pow(clamp(dot(normal, normalize(V+fixedLight)), 0.0, 1.0), 4.0*u_materialShininess);
	vec3 specular = vec3(specularValue, specularValue, specularValue);
	
	gl_FragColor.rgb = gl_FragColor.rgb * (vec3(u_materialAmbient) + vec3(u_materialDiffuse) * diffuse) + specular;
	//gl_FragColor.rgb = clamp(gl_FragColor.rgb, 0.0, 1.0);
    */
}