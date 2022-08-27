import * as THREE from "three";
import { Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PreventDragClick } from "./PreventDragClick";

/**
 * // ----- 주제: 특정 방향의 광선(ray)에 맞은 mesh 의 판별

	- raycaster가 쏘는 광선

  - 1. 클릭한 메쉬 감지하기
  - 2. 클릭시 드래그 이벤트 감지 방지
    : 마우스 이벤트를 활용하여 mouseMove일때 예외처리
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
  camera.position.x = 5;
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
  const controls = new OrbitControls(camera, renderer.domElement);

  // BufferGeometry
  // 아무것도 없는 기본 geometry
  // 점을 두개 만들어서 선을 이어줌.

  const points = [];
  points.push(new THREE.Vector3(0, 0, 100));
  points.push(new THREE.Vector3(0, 0, -100));

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: "plum",
  });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.name = "box";

  const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: "lime",
  });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.name = "torus";

  scene.add(boxMesh, torusMesh);

  const meshes = [boxMesh, torusMesh];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  console.log(mouse);

  // // Mesh
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshStandardMaterial({
  //   color: "seagreen",
  // });
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();
    // boxMesh.position.y = Math.sin(time) * 2;
    // torusMesh.position.y = Math.cos(time) * 2;
    // boxMesh.material.color.set("plum");
    // torusMesh.material.color.set("lime");

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // click check
  function checkIntersects() {
    if (preventDragClick.mouseMoved) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);
    for (const item of intersects) {
      console.log(item.object.name);
      item.object.material.color.set("red");
      break; // 처음 클릭된 mesh만 선택한다.
    }

    // if (intersects[0]) {
    //   console.log(intersects[0].object.name);
    // }
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  canvas.addEventListener("click", (e) => {
    console.log(e.clientX, e.clientY);
    mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);

    checkIntersects();
  });

  const preventDragClick = new PreventDragClick(canvas);

  draw();
}
