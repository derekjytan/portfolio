uniform sampler2D atmosphereTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
    float intensity = 0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.0);
    vec3 earthColor = texture2D(atmosphereTexture, vertexUV).xyz;

    gl_FragColor = vec4(atmosphere + earthColor, 1.0);

}
