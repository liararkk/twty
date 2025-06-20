async function loadShader(path) {
  const res = await fetch(path);
  return await res.text();
}

async function initShaderBackground() {
  const vertexShader = await loadShader("/shaders/vertex.glsl");
  const fragmentShader = await loadShader("/shaders/fragment.glsl");

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const main = document.querySelector(".main");
  const width = main.clientWidth;
  const height = main.clientHeight;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.domElement.classList.add("webgl-bg");
  main.appendChild(renderer.domElement);

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(width, height) },
    iMouse: { value: new THREE.Vector4() },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  window.addEventListener("resize", () => {
    const w = main.clientWidth;
    const h = main.clientHeight;
    renderer.setSize(w, h);
    uniforms.iResolution.value.set(w, h);
  });

  // 마우스 이벤트
  window.addEventListener("mousemove", (e) => {
    uniforms.iMouse.value.set(e.clientX, height - e.clientY, 0, 0);
  });

  function animate(time) {
    requestAnimationFrame(animate);
    uniforms.iTime.value = time * 0.001;
    renderer.render(scene, camera);
  }

  animate();
}

initShaderBackground();
