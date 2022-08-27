import * as THREE from "three";

/**
 * Fog 처리
 *  mesh 10개 생성 (geometry와 material은 하나로 사용가능)
 *
 * scene.fog = new THREE.Fog('blue', 3, 7);
 */
export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // ex02 threejs에서 고해상도 픽셀표시를 위해 사용함.
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setClearAlpha(0.5);
  // renderer.setClearColor("#00ff00");
  // renderer.setClearAlpha(0.5);

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("blue");

  scene.fog = new THREE.Fog("white", 3, 7);
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // near
    1000 // far
  );
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  // 빛
  const light = new THREE.DirectionalLight("ffffff", 100); // 색상, 감도(클수록 밝아짐)
  light.position.z = 5;
  light.position.y = 3;
  light.position.x = 10;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const matrial = new THREE.MeshStandardMaterial({
    color: "red", // 'red', '#ff0000
  });

  // const mesh = new THREE.Mesh(geometry, matrial);

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, matrial);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  scene.add(mesh);
  console.log(window.devicePixelRatio); // 장비의 픽셀 밀도

  // threejs animation 기본
  let time = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;
    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });
    renderer.render(scene, camera);
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  // ex02의 주요내용
  function setSize() {
    // 카메라 조정 (종횡비)
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  window.addEventListener("resize", setSize);
  draw();
}
