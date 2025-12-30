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

camera.position.z = 8;

// Animation variables
let time = 0;
const rotationSpeedX = 0.0008;
const rotationSpeedY = 0.0012;
const zoomSpeed = 0.0008;
const cameraMovementSpeed = 0.001;
let scrollBasedX = 0;

// Detect which section is in view and set camera position
function updateCameraBasedOnScroll() {
  const sections = document.querySelectorAll('section');
  let activeSection = 0;
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      activeSection = index;
    }
  });
  
  // Move camera left/right more dramatically based on section
  scrollBasedX = (activeSection - 1) * 8;
}

// Add scroll listener
window.addEventListener('scroll', updateCameraBasedOnScroll);

// Animation
function animate() {
  requestAnimationFrame(animate);
  
  // Smooth rotation
  time += 1;
  torus.rotation.x = time * rotationSpeedX;
  torus.rotation.y = time * rotationSpeedY;
  
  // Extreme zoom in and out effect
  const zoomFactor = 2 + Math.sin(time * zoomSpeed) * 6;
  camera.position.z = zoomFactor;
  
  // Strong sideways movement - much more visible
  const animationX = Math.sin(time * cameraMovementSpeed) * 6;
  camera.position.x = scrollBasedX + animationX;
  
  // Strong vertical camera movement
  camera.position.y = Math.cos(time * cameraMovementSpeed * 0.8) * 4;
  
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

