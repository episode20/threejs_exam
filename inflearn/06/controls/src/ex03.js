import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";

/**
 *  ----- 주제: FlyControls 카메라 컨트롤
 * 마우스 왼쪽 : 위
 * 마우스 오른쪽 : 아래
 * 키보드 r : 아래
 * 키보드 f : 위
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
  const controls = new FlyControls(camera, renderer.domElement);
  controls.rollSpeed = 0.5;
  controls.dragToLook = true; //마우스 움직임에 영향받지 않음. 드래그만 영향받음.

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

    controls.update(delta);
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
