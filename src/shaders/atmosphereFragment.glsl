varying vec3 vertexNormal;

void main() {
    float intensity = pow(1.4 - dot(normalize(vertexNormal), vec3(0, 0, 1.0)), 4.0);
    gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
}