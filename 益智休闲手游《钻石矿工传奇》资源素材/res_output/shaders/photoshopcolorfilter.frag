varying lowp vec4 v_color;
varying lowp vec2 v_texCoord;

uniform sampler2D u_texture;

/*
** Hue, saturation, luminance
*/

lowp float LuminanceFromRGB(lowp vec4 color)
{
	lowp float lum;
	lowp float fmin = min(min(color.r, color.g), color.b);    //Min. value of RGB
	lowp float fmax = max(max(color.r, color.g), color.b);    //Max. value of RGB
	lum = (fmax + fmin) / 2.0;
	
	return lum;
}

/*vec3 RBGToHSL(vec4 color)
{
	vec3 hsl; // init to 0 to avoid warnings ? (and reverse if + remove first part)
	
	float fmin = min(min(color.r, color.g), color.b);    //Min. value of RGB
	float fmax = max(max(color.r, color.g), color.b);    //Max. value of RGB
	float delta = fmax - fmin;             //Delta RGB value

	hsl.z = (fmax + fmin) / 2.0; // Luminance

	if (delta == 0.0)		//This is a gray, no chroma...
	{
		hsl.x = 0.0;	// Hue
		hsl.y = 0.0;	// Saturation
	}
	else                                    //Chromatic data...
	{
		if (hsl.z < 0.5)
			hsl.y = delta / (fmax + fmin); // Saturation
		else
			hsl.y = delta / (2.0 - fmax - fmin); // Saturation
		
		float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
		float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
		float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;

		if (color.r == fmax )
			hsl.x = deltaB - deltaG; // Hue
		else if (color.g == fmax)
			hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue
		else if (color.b == fmax)
			hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue

		if (hsl.x < 0.0)
			hsl.x += 1.0; // Hue
		else if (hsl.x > 1.0)
			hsl.x -= 1.0; // Hue
	}

	return hsl;
}*/

//Obtained from here: http://lolengine.net/blog/2013/01/13/fast-rgb-to-hsv
lowp vec3 OptimizedRBGToHSL(lowp vec4 color)
{
	highp vec3 hsl;
	highp float K = 0.;

    if (color.g < color.b)
    {
		color.gb = color.bg;
        K = -1.;
    }

    if (color.r < color.g)
    {
		color.rg = color.gr;
        K = -2. / 6. - K;
    }

    lowp float chroma = color.r - min(color.g, color.b);
    hsl.r = abs(K + (color.g - color.b) / (6. * chroma + 1e-20));
    hsl.g = chroma / (color.r + 1e-20);
    hsl.b = color.r;
	
	return hsl;
}


lowp float HueToRGB(lowp float f1, lowp float f2, highp float hue)
{
	if (hue < 0.0)
		hue += 1.0;
	else if (hue > 1.0)
		hue -= 1.0;
	lowp float res;
	if ((6.0 * hue) < 1.0)
		res = f1 + (f2 - f1) * 6.0 * hue;
	else if ((2.0 * hue) < 1.0)
		res = f2;
	else if ((3.0 * hue) < 2.0)
		res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
	else
		res = f1;
	return res;
}

lowp vec3 HSLToRGB(lowp vec3 hsl)
{
	lowp vec3 rgb;
	
	if (hsl.y == 0.0)
		rgb = vec3(hsl.z); // Luminance
	else
	{
		lowp float f2;
		
		if (hsl.z < 0.5)
			f2 = hsl.z * (1.0 + hsl.y);
		else
			f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
			
		lowp float f1 = 2.0 * hsl.z - f2;
		
		rgb.r = HueToRGB(f1, f2, hsl.x + (1.0/3.0));
		rgb.g = HueToRGB(f1, f2, hsl.x);
		rgb.b= HueToRGB(f1, f2, hsl.x - (1.0/3.0));
	}
	
	return rgb;
}

void mainOld()
{
	lowp vec4 oldRGB = texture2D(u_texture, v_texCoord);
	lowp vec4 newRGB = v_color * texture2D(u_texture, v_texCoord);
	
	lowp float oldLuminance = LuminanceFromRGB(oldRGB);
	lowp vec3 newHSL = OptimizedRBGToHSL(newRGB);
	
	newHSL.b = oldLuminance * v_color.a; //b component is luminance
	lowp vec3 resultColor = HSLToRGB(newHSL);
	
	gl_FragColor.r = resultColor.r;
	gl_FragColor.g = resultColor.g;
	gl_FragColor.b = resultColor.b;
	gl_FragColor.a = 1.0 * oldRGB.a;	
}

void main()
{
	lowp vec4 textureRgb = texture2D(u_texture, v_texCoord);
	lowp vec4 newRGB = v_color * texture2D(u_texture, v_texCoord);
	
	gl_FragColor = newRGB;	
	gl_FragColor.rgb *= v_color.a; //using the alpha chanel to change luminosity
	gl_FragColor.a = textureRgb.a;
}