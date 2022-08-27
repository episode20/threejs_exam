import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

/**
 *  ----- 주제: PointerLockControls 카메라 컨트롤
 *  controls.update(delta); 메서드 없음.
 *  자동 동작 없음. controls.lock() 호출이 필요하며, 사용자의 제스처가 필요함.
 *
 * canvas.requestPointerLock() 호출시 마우스 포인터 사라짐.
 */
export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new PointerLockControls(camera, renderer.domElement);

  controls.domElement.addEventListener("click", () => {
    controls.lock();
  });

  controls.addEventListener("lock", () => {
    console.log("lock");
  });
  controls.addEventListener("unlock", () => {
    console.log("unlock");
  });
  // Mesh
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshStandardMaterial({
  //   color: "seagreen",
  // });
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;
  console.log(Math.floor(Math.random() * 255));
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
					${50 + Math.floor(Math.random() * 205)},
					${50 + Math.floor(Math.random() * 205)},
					${50 + Math.floor(Math.random() * 205)}
			)`,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    // controls.update(delta);
    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
