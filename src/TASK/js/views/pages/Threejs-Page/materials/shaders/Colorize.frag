uniform sampler2D tDiffuse;
uniform vec3 uColor;
uniform vec2 uv;
void main() {
	gl_FragColor = vec4(uColor, texture2D( tDiffuse, uv ).a);
}
