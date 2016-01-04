varying mediump vec4 v_texCoord; 	// xy coords are color texture coord, zw coord are world scale transforms
varying mediump vec3 v_texOrigin;  	// xy are bump pattern tile origin, z is random start for tiles
uniform lowp vec4 u_color4;
uniform lowp vec4 u_materialAmbient;
uniform lowp vec4 u_materialDiffuse;
uniform sampler2D u_texture;
 


				
void main()
{

    // Compute the bump tile coordinate to use, reverting the scale stretch applied. 
    // Span it horizontally to the bump pattern row and Repeat when off coords
    mediump vec2 bumpTiledUV = vec2(
        mod((v_texCoord.x - v_texOrigin.x) * v_texCoord.z + v_texOrigin.y + (v_texOrigin.x * 0.25), 1.0),
        mod((v_texCoord.y - v_texOrigin.y) * v_texCoord.w, 0.25) + v_texOrigin.z
    );

    // Get the RGB channels components of the texel and color tint them using the maxRGB technique
    lowp vec4 colorTex = texture2D(u_texture, v_texCoord.xy);
 
	// The bump pattern is overlayed on the color image
	// Using a blend overlay technique. It applies color Multiply when range is dark shadows 
	// and Inverse of multiply when in highlights.
	lowp vec4 bumpColor = texture2D(u_texture, bumpTiledUV);
	lowp vec3 color = max(
				max(
					colorTex.r * u_materialAmbient.rgb, /*bottom*/
					colorTex.g * u_materialDiffuse.rgb 	/*middle*/
				),
				colorTex.b * u_color4.rgb 				/* top  */
			);
		
	if(bumpColor.a <= 0.495)
	{
		// Multiply
		gl_FragColor.r = 2.0 * bumpColor.a * color.r;
		gl_FragColor.g = 2.0 * bumpColor.a * color.g;
		gl_FragColor.b = 2.0 * bumpColor.a * color.b;
	}
	else
	{
		// Inverse Multiply
		gl_FragColor.r = 1.0 - 2.0 * (1.0 - bumpColor.a) * (1.0 - color.r);
		gl_FragColor.g = 1.0 - 2.0 * (1.0 - bumpColor.a) * (1.0 - color.g);
		gl_FragColor.b = 1.0 - 2.0 * (1.0 - bumpColor.a) * (1.0 - color.b);
	}
	
    gl_FragColor.a = 1.0;
}