attribute highp vec4 a_position;
attribute mediump vec2 a_texCoord;
attribute mediump vec4 a_texCoord2; // xy coord are world scale transforms, zw coords are bump pattern tile origin
attribute mediump float a_tileSelected;
uniform highp mat4 u_modelViewProjectionMatrix;

varying mediump vec4 v_texCoord; 	// xy coords are color texture coord, zw coord are world scale transforms
varying mediump vec3 v_texOrigin;  	// xy are bump pattern tile origin, z is random start for tiles

void main() {
	gl_Position = u_modelViewProjectionMatrix * a_position;
	v_texCoord.xy = a_texCoord;
	v_texCoord.zw = a_texCoord2.xy;
	v_texOrigin.xy = a_texCoord2.zw;
	v_texOrigin.z = a_tileSelected;
}