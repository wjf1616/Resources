
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

void main() 
{
	vec4 color = texture2D(u_texture, v_texCoord);
	float grayScale = dot(color.rgb, vec3(0.33));
	vec4 gray = vec4( grayScale, grayScale, grayScale, color.a);	
	gl_FragColor = mix(color, gray, v_color.a);	
}