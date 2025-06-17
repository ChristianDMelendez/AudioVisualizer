let scene, camera, renderer, geometry, material, mesh, uniforms;
let clock = new THREE.Clock();

function initVisualizer(audioFeatureValue = 0.5) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("blob-canvas"),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  uniforms = {
    u_time: { value: 0.0 },
    u_intensity: { value: audioFeatureValue }
  };

  const loader = new THREE.FileLoader();
  loader.load('vertex.txt', function (vert) {
    loader.load('fragment.txt', function (frag) {
      geometry = new THREE.IcosahedronGeometry(2, 100);
      material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vert,
        fragmentShader: frag,
        wireframe: true
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      camera.position.z = 5;
      animate();
    });
  });
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.u_time.value += clock.getDelta();
  mesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}
