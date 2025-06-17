varying vec3 vNormal;

void main() {
  float brightness = dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
  gl_FragColor = vec4(vec3(1.0) * brightness, 1.0);
}
