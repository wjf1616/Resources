varying lowp vec4 v_color; 
varying lowp vec2 v_texCoord;
varying lowp vec4 v_maskbox; // vector is encoding mask coordinates!: umin, vmin, umax, vmax

uniform sampler2D u_texture;

void main(void)
{
    highp vec4 texcolor = texture2D(u_texture, v_texCoord);
    gl_FragColor = texcolor * v_color;
	// Mask values only between given umin, vmin, umax, vmax coordinates
	if (v_texCoord.x < v_maskbox.x || v_texCoord.x > v_maskbox.z || 
		v_texCoord.y < v_maskbox.y || v_texCoord.y > v_maskbox.w
	)
	{
		gl_FragColor.a = 0.0;
	}
}
