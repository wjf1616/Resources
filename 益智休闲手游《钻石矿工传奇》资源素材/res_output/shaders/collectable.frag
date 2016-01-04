
varying mediump vec3 v_normal;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;
uniform lowp vec4 u_materialAmbient;
uniform lowp vec4 u_materialDiffuse;
uniform lowp vec4 u_materialSpecular;
uniform mediump float u_materialShininess;
uniform lowp vec4 u_color4;

void main() {
	//vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
	gl_FragColor = u_color4 * texture2D(u_texture, v_texCoord);
	vec3 lightPosition = vec3(1.0, 0.0, -1.0);	
	float nDotL1 = clamp(dot(normalize(lightPosition), normalize(v_normal)), 0.0, 1.0);
						
	gl_FragColor.rgb *=	vec3(u_materialAmbient) +
						vec3(u_materialDiffuse) * nDotL1;

	gl_FragColor.rgb +=	vec3(u_materialSpecular) * pow(nDotL1, u_materialShininess);
						
	/*gl_FragColor.rgb +=	vec3(u_materialAmbient) +
						vec3(u_materialDiffuse) * nDotL1 +
						vec3(u_materialSpecular) * pow(nDotL1, u_materialShininess);*/

}