
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
	vec3 V = vec3(0.0, 0.0, 1.0); // infinite point of view
    vec3 normal = vec3(0.0, 0.0, 1.0);
	vec3 diffuse = vec3(0.745, 0.745, 0.745);
	float specularValue = pow(0.934, 4.0 * u_materialShininess);
	vec3 specular = vec3(specularValue, specularValue, specularValue);
	
	float nDotL1 = 0.0;
	float attenuation = 0.0;
	if(u_color4.r!=0.0 || u_color4.g!=0.0) {
		vec3 light0 = vec3(1000.0, 0.0, 100.0);
		vec3 light1 = vec3(0.0, 1000.0, 100.0);
		vec3 light = light0+u_color4.a*vec3(-1000.0, 1000.0, 0);
		vec3 fluorescentDirection = normalize(vec3(u_color4.r, u_color4.g, 0.0));
		vec3 PL = v_position.xyz-light;
		float d = dot(PL, fluorescentDirection);
	
		vec3 lightPerpendicular = (light+d*fluorescentDirection)-v_position.xyz;
		vec3 lightPerpendicularNormalized = normalize(lightPerpendicular);
		float distance = dot(lightPerpendicular, lightPerpendicular) * 0.01;
		
		nDotL1 = clamp(dot(lightPerpendicularNormalized, normal), 0.0, 1.0);
		
		attenuation = 1.0/(1.0+0.0001*distance+0.001*distance*distance);
		
		nDotL1 *= attenuation;
		diffuse+= vec3(nDotL1, nDotL1, nDotL1);
		specularValue = pow(clamp(dot(normal, normalize(V+lightPerpendicularNormalized)), 0.0, 1.0), 4.0*u_materialShininess);
		specular += vec3(specularValue, specularValue, specularValue)*attenuation; 			
	}
	
	gl_FragColor.rgb = gl_FragColor.rgb * (vec3(u_materialAmbient) + vec3(u_materialDiffuse) * diffuse) + specular;
}