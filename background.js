///-------------sprial ring---------------
// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-ring'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);

const colorsArray = [
  new THREE.Color("#08060d"), // dark
  new THREE.Color("#2b5bac"), // blue
  new THREE.Color("#929092"), // grey
  new THREE.Color("#3e673b")  // greenish
];

const colors = [];
const count = geometry.attributes.position.count;

for (let i = 0; i < count; i++) {
  const t = i / count;
  let c;
  if (t < 0.33) {
    c = colorsArray[0].clone().lerp(colorsArray[1], t / 0.33);
  } else if (t < 0.66) {
    c = colorsArray[1].clone().lerp(colorsArray[2], (t - 0.33) / 0.33);
  } else {
    c = colorsArray[2].clone().lerp(colorsArray[3], (t - 0.66) / 0.34);
  }
  colors.push(c.r, c.g, c.b);
}

geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial({ vertexColors: true, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 5;

// Animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

