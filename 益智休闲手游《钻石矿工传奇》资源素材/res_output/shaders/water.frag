
varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
/*
	gl_FragColor = v_color * texture2D(u_texture, v_texCoord);
	
	if(rand(v_texCoord)>0.95)
	{
		gl_FragColor = vec4(1.0, 1.0, 1.0, gl_FragColor.a+0.4);
	}	
*/
	gl_FragColor = v_color * vec4(1, 1, 1, texture2D(u_texture, v_texCoord).a);
}