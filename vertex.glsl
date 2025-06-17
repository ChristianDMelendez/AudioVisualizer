uniform float u_time;
uniform float u_intensity;
varying vec3 vNormal;

float noise(vec3 p){
    return sin(p.x) * cos(p.y) * sin(p.z);
}

void main() {
    vNormal = normalize(normal);
    vec3 newPosition = position + normal * noise(position + u_time) * u_intensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
